"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  let pathSegments: { name: string; href: string }[] = pathname
    .split("/")
    .slice(1)
    .map((segment, i) => {
      const href = "/" + pathname.split("/").slice(1, i + 1).join("/");
      const format = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { name: format, href };
    });
    pathSegments[0].href = "/admin";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, i) => (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={segment.href}>
                {segment.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
           {i < pathSegments.length - 1 && (
            <BreadcrumbSeparator className="hidden md:block" />
           )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
