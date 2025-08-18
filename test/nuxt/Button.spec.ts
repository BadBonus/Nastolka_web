import {mount} from '@vue/test-utils'
import {describe, it, expect} from 'vitest'
import Button from '@/components/globals/Button/index.vue';

describe('Button.vue', () => {
  it('рендерится с дефолтными пропсами', () => {
    const wrapper = mount(Button)
    const btn = wrapper.find('button')

    expect(btn.exists()).toBe(true)
    expect(btn.attributes('type')).toBe('button')
    expect(btn.classes()).toContain('inline-flex')
  })

  it('применяет переданные variant и color', () => {
    const wrapper = mount(Button, {
      props: {variant: 'outline', color: 'danger'}
    })
    const btn = wrapper.get('button')

    // variantColorClasses проверяется косвенно через наличие класса
    expect(btn.classes().some(c => c.includes('danger'))).toBe(true)
  })

  it('работает проп size и onlyIcon', () => {
    const wrapper = mount(Button, {
      props: {size: 'lg', onlyIcon: true}
    })
    expect(wrapper.get('button').classes().some(c => c.includes('lg'))).toBe(true)
  })

  it('блоковая кнопка при block=true', () => {
    const wrapper = mount(Button, {
      props: {block: true}
    })
    expect(wrapper.get('button').classes()).toContain('w-full')
  })

  it('скруглённая при rounded=true', () => {
    const wrapper = mount(Button, {
      props: {rounded: true}
    })
    expect(wrapper.get('button').classes()).toContain('rounded-full')
  })

  it('disabled состояние', () => {
    const wrapper = mount(Button, {
      props: {disabled: true}
    })
    const btn = wrapper.get('button')
    expect(btn.attributes('disabled')).toBeDefined()
    expect(btn.classes()).toContain('cursor-not-allowed')
  })

  it('loading состояние отображает loader и скрывает контент', () => {
    const wrapper = mount(Button, {
      props: {loading: true}
    })
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
    const span = wrapper.get('span')
    expect(span.classes()).toContain('invisible')
  })

  it('отображает иконку слева', () => {
    const wrapper = mount(Button, {
      props: {icon: 'mdi:chevron-left', iconPos: 'left'},
      slots: {default: 'Текст'}
    })
    const icon = wrapper.find('span.iconify')
    expect(icon.exists()).toBe(true)
  })

  it('отображает иконку справа', () => {
    const wrapper = mount(Button, {
      props: {icon: 'mdi:chevron-left', iconPos: 'right'},
      slots: {default: 'Текст'}
    })
    const icon = wrapper.find('span.iconify')
    expect(icon.exists()).toBe(true)
  })

  it('передаёт слот по умолчанию', () => {
    const wrapper = mount(Button, {
      slots: {default: 'Click me'}
    })
    expect(wrapper.text()).toContain('Click me')
  })
})