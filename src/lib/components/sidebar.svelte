<script lang='ts'>
    import { Button } from '$lib/components/ui/button';
    import { Cable } from 'lucide-svelte';
</script>

<aside class='h-full border-r md:block hidden'>
    <div class='border-b p-2 flex items-center justify-center gap-2'>
        <Button size='icon' variant='outline' class='text-primary'>
            <Cable />
        </Button>
    </div>
</aside>
