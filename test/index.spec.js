// Imports
import Vuetify from 'vuetify'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
import indexPageToTest from '@/pages/index'

describe('This is my first test in my life', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should have a custom title and match snapshot', () => {
    const wrapper = mount(indexPageToTest, {
      localVue,
      vuetify
    })
    const header1 = wrapper.find('.header1')
    const header2 = wrapper.find('.header2')
    const header3 = wrapper.find('.header3')
    const header4 = wrapper.find('.header4')
    const header5 = wrapper.find('.header5')

    expect(header1.text()).toBe("ชื่อกองทุน")
    expect(header2.text()).toBe("อันดับของกองทุน")
    expect(header3.text()).toBe("เวลาที่ข้อมูลถูกอัพเดต")
    expect(header4.text()).toBe("ผลตอบแทน")
    expect(header5.text()).toBe("ราคา")

    wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
