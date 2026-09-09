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
    },

    avatar: {
      slots: {
        root: 'outline-3 outline-[var(--ui-border)] -outline-offset-6 border-6 border-primary-inverted'
      }
    }
  },
});
