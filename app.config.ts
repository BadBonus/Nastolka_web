export default defineAppConfig({
  ui: {
    tabs: {
      slots: {
        list: '!rounded-md',
        indicator: '!rounded-sm',
        label: 'text-text-inverted',
        trigger: 'hover:text-text-inverted!'
      }
    },
    popover: {
      slots: {
        content: 'border-2'
      }
    },
    toast: {
      variants: {
        color: {
          error: {
            root: 'bg-danger text-white border-dark-brown border-2',
            title: 'text-white font-bold',
            description: 'text-white',
          }
        }
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
        item: 'hover:bg-dark-blue hover:text-white!'
      }
    },
    button: {
      slots: {
        base: 'rounded-sm',
      }
    },
    drawer: {
      slots: {
        base: 'text-[inherit]',
        content: 'drawer',
        'overlay': 'bg-secondary/50'
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
    radiogroup: {
      slots: {
        // indicator: 'bg-dark-blue!', //не работает
      }
    },
    checkboxGroup: {
      slots: {

      }
    },
    card: {
      slots: {
        root: 'overflow-hidden',
        header: 'p-2 sm:p-1 border-text border-b-2',
        body: 'p-3 sm:py-2 sm:px-1 border-text border-b-2',
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
    },
    textarea: {
      slots: {
        base: '!bg-neutral-light shadow-button border-solid border-2 border-border',
      }
    },
    SelectMenu: {
      slots: {

      }
    }
  }
})