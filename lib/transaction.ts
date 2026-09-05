interface TransactionStep<T = any> {
    name: string;
    action: () => Promise<T>;
    rollback: () => Promise<void>;
}

class Transaction {
    completedSteps: TransactionStep[] = [];
    isRolledBack: boolean = false;
    rollbackErrors: { stepName: string; error: Error }[] = [];

    async addStep({ name, action, rollback }: TransactionStep) {
        const step: TransactionStep = { name, action, rollback };
        try {
            const data = await step.action();
            this.completedSteps.unshift(step);
            return data;
        } catch (error) {
            console.error(`Error in step "${name}":`, error, "Rolling back completed steps...");
            await this.rollback();
            throw error;
        }

    }

    async rollback() {
        if (this.isRolledBack) {
            console.warn("Rollback already performed. Skipping.");
            return;
        }

        this.isRolledBack = true;
        while (this.completedSteps.length > 0) {
            const step = this.completedSteps.shift()!; // Remove the step after rollback attempt
            if (step.rollback) {
                try {
                    await step.rollback();
                } catch (error) {
                    console.error(`Error in rollback for step "${step.name}":`, error, "Continuing with remaining rollbacks...");
                    this.rollbackErrors.push({ stepName: step.name, error: error as Error });
                }

            }
        }
        if (this.rollbackErrors.length > 0) {
            console.error("Rollback completed with errors:", this.rollbackErrors);
        } else {
            console.log("Rollback completed successfully.");
        }
    }
}

export default Transaction;