export default defineAppConfig({
  ui: {
    card: {
      slots: {
        root: 'rounded-lg overflow-hidden',
        header: 'p-2 sm:p-1',
        body: 'p-3 sm:py-2 sm:px-1',
        footer: 'p-2 sm:p-1'
      },
      // variants: {
      //   variant: {
      //     solid: {
      //       root: 'bg-inverted text-inverted'
      //     },
      //     outline: {
      //       root: 'bg-default ring ring-default divide-y divide-default'
      //     },
      //     soft: {
      //       root: 'bg-elevated/50 divide-y divide-default'
      //     },
      //     subtle: {
      //       root: 'bg-elevated/50 ring ring-default divide-y divide-default'
      //     }
      //   }
      // },
      // defaultVariants: {
      //   variant: 'outline'
      // }
    }
  }
})