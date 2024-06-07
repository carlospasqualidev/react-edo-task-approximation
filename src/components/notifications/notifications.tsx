/* eslint-disable react/no-array-index-key */
import { Bell } from 'lucide-react';

import React from 'react';
import { toast } from 'react-toastify';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface INotificationItem {
  image: string;
  title: string;
  description: string;
}

const notifications = [
  {
    image:
      'https://img.freepik.com/fotos-gratis/linda-borboleta-na-natureza_23-2150445580.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705449600&semt=sph',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image:
      'https://img.freepik.com/fotos-gratis/linda-borboleta-na-natureza_23-2150445580.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705449600&semt=sph',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image:
      'https://img.freepik.com/fotos-gratis/linda-borboleta-na-natureza_23-2150445580.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705449600&semt=sph',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image:
      'https://img.freepik.com/fotos-gratis/linda-borboleta-na-natureza_23-2150445580.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705449600&semt=sph',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image: '',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image: '',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image: '',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image: '',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image: '',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image: '',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    href: '',
  },
  {
    image: '',
    title: 'Curso de unity',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source. ',
    href: '',
  },
];

function showToast() {
  toast.info(
    'Oops! O redirecionamento em notifiçãoes está a caminho. Agradecemos a sua paciência :)',
  );
}

function NotificationItem({ image, title, description }: INotificationItem) {
  return (
    <DropdownMenuItem
      className="m-2 mr-4 flex cursor-pointer gap-4 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      onClick={() => showToast()}
    >
      <div>
        <Avatar className="min-w min-h-9">
          <AvatarImage src={image} alt="user image profile" />
          <AvatarFallback className="bg-muted-foreground">
            {title.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <h4 className="mb-1 text-sm font-medium leading-none">{title}</h4>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </div>
    </DropdownMenuItem>
  );
}

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[450px]" align="end" forceMount>
        <h3 className="flex items-center justify-center p-1 text-lg font-semibold tracking-tight">
          Notificações
        </h3>
        <DropdownMenuSeparator />

        <ScrollArea className="h-96">
          {notifications.map(({ description, title, image }, index) => (
            <React.Fragment key={index}>
              <NotificationItem
                description={description}
                title={title}
                image={image}
              />
              {index < notifications.length - 1 && (
                <DropdownMenuSeparator className="mx-8" />
              )}
            </React.Fragment>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
