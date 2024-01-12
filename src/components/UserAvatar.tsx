import { Avatar, AvatarFallback, AvatarImage,} from '@/components/ui/avatar';
import { type AvatarProps } from '@radix-ui/react-avatar';
import { User } from 'next-auth';
import Image from 'next/image';
import React from 'react';

interface Props {
    user: Pick<User, 'name' | 'image'>
    
}

const UserAvatar: React.FC<Props> = ({user, ...props}) => {
    return (
        <Avatar {...props}>
            {user.image ? (
                <AvatarImage 
                    className='relative w-full h-full aspect-square' 
                    src={user.image} 
                    alt="Profile Image" 
                    referrerPolicy='no-referrer' />
            ) : (
                <AvatarFallback>
                    <span className="sr-only">{user?.name}</span>
                </AvatarFallback>
            )}
        </Avatar>
    )
}

export default UserAvatar
