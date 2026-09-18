export default defineAppConfig({
  ui: {
    colors: {
      neutral: 'neutral',
    },
    input: {
      slots: {
        base: 'border-2',
      },
    },
    textarea: {
      slots: {
        base: 'border-2',
      },
    },
    selectMenu: {
      slots: {
        base: 'border-2',
      },
    },
    card: {
      slots: {
        root: 'overflow-visible',
      },
    },
    button: {
      variants: {
        color: {
          error: 'sketchy-border-3',
          info: 'sketchy-border-4',
          success: 'sketchy-border-5',
          primary: 'sketchy-border-2',
          warning: 'sketchy-border',
          secondary: 'sketchy-border-6',
        },


      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'outline',
          class: 'border-primary text-primary hover:bg-primary/10 active:bg-primary/10',
        },
        {
          color: 'secondary',
          variant: 'outline',
          class: 'border-secondary text-secondary hover:bg-secondary/10 active:bg-secondary/10',
        },
        {
          color: 'success',
          variant: 'outline',
          class: 'border-success text-success hover:bg-success/10 active:bg-success/10',
        },
        {
          color: 'info',
          variant: 'outline',
          class: 'border-info text-info hover:bg-info/10 active:bg-info/10',
        },
        {
          color: 'warning',
          variant: 'outline',
          class: 'border-warning text-warning hover:bg-warning/10 active:bg-warning/10',
        },
        {
          color: 'error',
          variant: 'outline',
          class: 'border-error text-error hover:bg-error/10 active:bg-error/10',
        },
        {
          color: 'neutral',
          variant: 'outline',
          class: 'bg-transparent border-background border-1  hover:bg-elevated hover:text-primary active:bg-elevated text-background',
        },
      ],
    },

    avatar: {
      slots: {
        root: 'outline-3 outline-[var(--ui-border)] -outline-offset-6 border-6 border-primary-inverted'
      }
    },

    badge: {
      slots: {
        base: 'border-2',
      },
    }
  },
});
