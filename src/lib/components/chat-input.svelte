<script lang='ts'>
    import { Button } from '$lib/components/ui/button';
    import { Textarea } from '$lib/components/ui/textarea';
    import { CornerDownLeft, Image, Paperclip } from 'lucide-svelte';
    import { createEventDispatcher } from 'svelte';
    import { toast } from 'svelte-sonner';

    const dispatch = createEventDispatcher<{
        submit: string
    }>();
    let value = '';
    const handleSubmit = () => {
        if (value.trim() === '') {
            toast.error('Please type a message before sending.');
            return;
        }
        dispatch('submit', value);
        value = '';
    }

</script>

<form class='border w-full max-w-screen-md rounded-lg focus-within:ring-ring overflow-hidden focus-within:ring-1 transition-all'
      on:submit|preventDefault={handleSubmit}
>
    <Textarea
        on:keypress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        }}
        bind:value class='resize-none border-0 shadow-none focus-visible:ring-0' rows={3} placeholder='Type your message here.' />
    <div class='p-3 pt-0 w-full flex gap-1'>
        <Button size='icon' variant='ghost' class='size-8'>
            <Image class='size-4' />
        </Button>
        <Button size='icon' variant='ghost' class='size-8'>
            <Paperclip class='size-4' />
        </Button>
        <Button size='sm' class='ml-auto gap-1 transition-all' type='submit' disabled={value === ''}>
            Send Message
            <!--            <Label class='text-xs font-semibold'>  </Label> -->
            <CornerDownLeft class='size-3.5' />
        </Button>
    </div>
</form>
