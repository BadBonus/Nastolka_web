export default defineAppConfig({
  ui: {
    popover: {
      slots: {
        content: 'border-2 '
      }
    },
    chip: {
      slots: {
        base: 'shadow-[none]',
      }
    },
    modal: {
      slots: {
        title: 'text-text text-2xl'
      }
    },
    selectMenu: {
      slots: {
        value: "font-semibold text-secondary",
        placeholder: "font-semibold",
        base: 'shadow-element border-2 border-border !bg-neutral-light',

      }
    },
    button: {
      slots: {
        base: 'rounded-sm',
      },
      variant: {
        primary: '-shadow-element'
      }
    },
    drawer: {
      slots: {
        content: 'drawer',
      },
    },
    input: {
      slots: {
        base: [
          'base-input',
        ],
      },
    },
    slider: {
      slots: {
        range: '!bg-warning',
        thumb: 'bg-neutral-light',
        track: 'bg-dark-brown'
      }
    },
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