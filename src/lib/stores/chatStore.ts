import { writable } from 'svelte/store';

export interface Chat {
    role: 'assistant' | 'user'
    content: string
}

function createChatListStore() {
    const initialChatList = typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('chatList') || '[]')
        : [];

    const chatListStore = writable<Chat[]>(initialChatList);

    // 订阅以更新 localStorage
    chatListStore.subscribe((value) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('chatList', JSON.stringify(value));
        }
    });

    return chatListStore;
}

export const chatListStore = createChatListStore();
