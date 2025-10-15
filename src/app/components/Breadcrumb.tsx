import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface CustomBreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
  color?: 'inherit' | 'primary' | 'secondary';
  className?: string;
}

const CustomBreadcrumbs = ({
  items,
  separator = ">",
  color = "inherit",
  className = ""
}: CustomBreadcrumbsProps) => {
  const router = useRouter();

  const handleClick = (href: string, customOnClick?: () => void) => {
    return (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      
      if (customOnClick) {
        customOnClick();
      } else if (href) {
        router.push(href);
      }
    };
  };

  const breadcrumbs = items.map((item, index) => {
    const isLastItem = index === items.length - 1;
    
    if (isLastItem || !item.href) {
      return (
        <Typography 
          key={index} 
          sx={{ color: 'text.primary' }}
          className="!font-leagueSpartan lg:!text-xl"
        >
          {item.label}
        </Typography>
      );
    }
    
    return (
      <Link
        key={index}
        underline="hover"
        color={color}
        href={item.href}
        onClick={handleClick(item.href, item.onClick)}
        className="!font-leagueSpartan cursor-pointer lg:!text-xl"
      >
        {item.label}
      </Link>
    );
  });

  return (
    <Stack spacing={2} className={className}>
      <Breadcrumbs 
        separator={separator} 
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

export default CustomBreadcrumbs;