import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHighResAvatar(url: string | null | undefined): string | null {
  if (!url) return null;
  
  let highResUrl = url;
  if (url.includes('facebook') || url.includes('fbsbx.com')) {
    highResUrl = url
      .replace(/height=\d+/, 'height=512')
      .replace(/width=\d+/, 'width=512')
      .replace(/type=normal/, 'type=large')
      .replace(/type=small/, 'type=large');
  }
  
  if (url.includes('googleusercontent.com')) {
    highResUrl = url.replace(/=s\d+-c/, '=s512-c');
  }

  if (url.includes('discordapp.com') || url.includes('discord.com')) {
    if (url.includes('size=')) {
      highResUrl = url.replace(/size=\d+/, 'size=512');
    } else {
      const separator = url.includes('?') ? '&' : '?';
      highResUrl = `${url}${separator}size=512`;
    }
  }

  return highResUrl;
}
