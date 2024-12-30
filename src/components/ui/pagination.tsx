import * as React from 'react';
import { cn } from '../../lib/utils';
import { Button } from './button';

interface PaginationProps extends React.ComponentProps<'nav'> {}

interface PaginationLinkProps
  extends React.ComponentProps<typeof Button> {
  isActive?: boolean;
}

const Pagination = React.forwardRef<
  HTMLElement,
  PaginationProps
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
));
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(({ className, isActive, ...props }, ref) => (
  <Button
    ref={ref}
    variant={isActive ? 'outline' : 'ghost'}
    className={cn(className)}
    {...props}
  />
));
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <span>Previous</span>
  </Button>
));
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
  </Button>
));
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <span className="text-2xl">...</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
