<script lang='ts'>
    import type { Chat } from '$lib/stores/chatStore';
    import ChatInput from '$lib/components/chat-input.svelte';
    import * as Avatar from '$lib/components/ui/avatar';
    import * as ContextMenu from '$lib/components/ui/context-menu';
    import { Label } from '$lib/components/ui/label';
    import { chatListStore } from '$lib/stores/chatStore';
    import { math } from '@cartamd/plugin-math';
    import autoAnimate from '@formkit/auto-animate';
    import { Carta, Markdown } from 'carta-md';
    import { Bot, Cable } from 'lucide-svelte';
    import { afterUpdate, onMount } from 'svelte';

    ;
    const carta = new Carta({
        disableIcons: undefined,
        disablePrefixes: undefined,
        disableShortcuts: undefined,
        disableTabOuts: undefined,
        gfmOptions: undefined,
        historyOptions: undefined,
        rehypeOptions: undefined,
        rendererDebounce: 0,
        sanitizer: false,
        shikiOptions: undefined,
        theme: undefined,
        extensions: [math()],
    });

    const handleSubmit = (event: CustomEvent<string>) => {
        const newChat: Chat = { role: 'user', content: event.detail };
        chatListStore.update(current => [...current, newChat]);
        const newChat2: Chat = { role: 'assistant', content: event.detail };
        chatListStore.update(current => [...current, newChat2]);
    };

    let chatContainer: HTMLDivElement | null = null;

    function scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth', // 设置平滑滚动
            });
        }
    }

    onMount(() => {
        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'auto',
            });
        }
    });

    afterUpdate(async () => {
        await new Promise(resolve => setTimeout(resolve, 250));
        scrollToBottom();
    });

</script>

<main class='flex-1 h-full flex flex-col items-center'>
    <div class='sticky top-0 w-full p-2 border-b flex items-center px-4 gap-3'>
        <Cable class='md:hidden' />
        <Label class='text-xl h-9 flex items-center font-semibold text-primary'> Cables </Label>
    </div>
    <div class='flex overflow-hidden flex-col flex-1 items-center w-full'>
        <div bind:this={chatContainer} class='overflow-y-auto flex-1 w-full flex flex-col items-center'>
            <div class='space-y-4 py-4 px-4 w-full max-w-screen-md' use:autoAnimate>
                {#each $chatListStore as chat}
                    {#if chat.role === 'user'}
                        <div class='flex flex-row-reverse gap-3'>
                            <Avatar.Root class='ring-1 ring-ring size-8 mt-0.5'>
                                <Avatar.Image src='https://github.com/shadcn.png' alt='' />
                                <Avatar.Fallback>CN</Avatar.Fallback>
                            </Avatar.Root>
                            <ContextMenu.Root>
                                <ContextMenu.Trigger>
                                    <div class='bg-primary whitespace-pre-wrap rounded-lg px-2 py-1.5 border text-primary-foreground'>{chat.content}</div>
                                </ContextMenu.Trigger>
                                <ContextMenu.Content>
                                    <ContextMenu.Item>Profile</ContextMenu.Item>
                                    <ContextMenu.Item>Billing</ContextMenu.Item>
                                    <ContextMenu.Item>Team</ContextMenu.Item>
                                    <ContextMenu.Item>Subscription</ContextMenu.Item>
                                </ContextMenu.Content>
                            </ContextMenu.Root>
                        </div>
                    {:else}
                        <div class='flex flex-col gap-3'>
                            <div class='flex gap-4 items-center'>
                                <div class='size-8 flex shrink-0 ring-1 ring-ring rounded-full items-center justify-center mt-0.5'>
                                    <Bot class='size-6' />
                                </div>
                                <Label class='text-lg font-bold'> GPT4o </Label>
                            </div>
                            <ContextMenu.Root>
                                <ContextMenu.Trigger>
                                    <div class='bg-muted prose dark:prose-invert max-w-none prose-p:m-0 prose-h3:mt-2 rounded-lg px-4 py-3 border !text-foreground'>
                                        <Markdown {carta} value={chat.content} />
                                    </div>
                                </ContextMenu.Trigger>
                                <ContextMenu.Content>
                                    <ContextMenu.Item>Profile</ContextMenu.Item>
                                    <ContextMenu.Item>Billing</ContextMenu.Item>
                                    <ContextMenu.Item>Team</ContextMenu.Item>
                                    <ContextMenu.Item>Subscription</ContextMenu.Item>
                                </ContextMenu.Content>
                            </ContextMenu.Root>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
        <div class='sticky w-full bottom-0 flex justify-center p-4 border-t'>
            <ChatInput on:submit={handleSubmit} />
        </div>
    </div>
</main>
