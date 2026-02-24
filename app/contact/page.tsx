import { Clock8Icon, MapPinIcon, BriefcaseBusinessIcon, PhoneIcon } from 'lucide-react'

import ContactUs from '@/components/contact-page-first-section'

const contactInfo = [
  {
    title: 'Office Hours',
    icon: Clock8Icon,
    description: 'Monday-Friday\n8:00 am to 5:00 pm'
  },
  {
    title: 'Our Address',
    icon: MapPinIcon,
    description: 'Woodlands Lusaka\n10101, Zambia'
  },
  {
    title: 'Office 2',
    icon: BriefcaseBusinessIcon,
    description: 'Munali Lusaka\n10101, Zambia'
  },
  {
    title: 'Phone Number',
    icon: PhoneIcon,
    description: '0977 3454 62'
  }
]

const ContactUsPage = () => {
  return (
    <main>
      <ContactUs contactInfo={contactInfo} />

      <section className="py-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-9 lg:grid-cols-2">
            <div className="flex flex-col gap-8 lg:gap-12">
              <div className="space-y-4">
                <p
                  className="text-primary text-sm font-medium tracking-wider"
                  style={{ filter: 'blur(0px)', opacity: 1, transform: 'none' }}
                >
                  <span
                    data-slot="badge"
                    className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-3 text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground text-sm font-normal"
                  >
                    Contact Us
                  </span>
                </p>

                <h2
                  className="text-2xl font-semibold md:text-3xl lg:text-4xl"
                  style={{ filter: 'blur(0px)', opacity: 1, transform: 'none' }}
                >
                  Connect With Us
                </h2>

                <p className="text-muted-foreground text-xl" style={{ filter: 'blur(0px)', opacity: 1, transform: 'none' }}>
                  Whether you're looking for more information, have a suggestion, or need help with something, we're here for you.
                </p>
              </div>

              <div style={{ filter: 'blur(0px)', opacity: 1, transform: 'none' }}>
                <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 border shadow-sm">
                  <div data-slot="card-content" className="px-6">
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <label
                          data-slot="label"
                          className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          data-slot="input"
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10"
                          id="name"
                          placeholder="Enter your name here..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          data-slot="label"
                          className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          data-slot="input"
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10"
                          id="email"
                          placeholder="Enter your Email here..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          data-slot="label"
                          className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                          htmlFor="budget"
                        >
                          Budget
                        </label>
                        <input
                          type="text"
                          data-slot="input"
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10"
                          id="budget"
                          placeholder="Enter the amount"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          data-slot="label"
                          className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                          htmlFor="message"
                        >
                          Message
                        </label>
                        <textarea
                          data-slot="textarea"
                          className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-24 resize-none"
                          id="message"
                          placeholder="Enter your message"
                        />
                      </div>

                      

                      <button
                        data-slot="button"
                        className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([className*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 w-full rounded-lg text-base font-medium has-[&gt;svg]:px-6"
                        type="submit"
                      >
                        Send Message
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send" aria-hidden="true">
                          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                          <path d="m21.854 2.147-10.94 10.939"></path>
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div style={{ filter: 'blur(0px)', opacity: 1, transform: 'none' }}>
                <div>
                  <img src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/contact-us/image-14.png" alt="Woman with phone" className="w-full rounded-md object-cover dark:hidden" />
                  <img src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/contact-us/image-14-dark.png" alt="Woman with phone" className="hidden w-full rounded-md object-cover dark:block" />
                </div>
              </div>

              <div style={{ filter: 'blur(0px)', opacity: 1, transform: 'none' }}>
                <div className="space-y-4 rounded-md border p-4">

                  <a href="mailto:abc@gmail.com" className="bg-muted hover:bg-muted-foreground/30 flex items-center gap-4 rounded-md px-6 py-4 transition-all duration-300">
                    <span data-slot="avatar" className="relative flex overflow-hidden rounded-full size-10 shrink-0">
                      <span data-slot="avatar-fallback" className="flex size-full items-center justify-center rounded-full bg-primary/10 [&amp;&gt;svg]:size-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
                      </span>
                    </span>
                    <div>
                      <h3 className="text-lg font-medium">Email</h3>
                      <p className="text-muted-foreground">quiksave@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactUsPage
