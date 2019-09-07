import { shallowMount } from '@vue/test-utils';
import SignUp from '@/views/pages/SignUp.vue';

describe('SignUp.vue', () => {
  it('renders props.msg when passed', () => {
    const step = 1;
    const wrapper = shallowMount(SignUp, {
      propsData: { step },
    });
    // expect(wrapper.text()).toMatch(msg);
    // wrapper.find(`.container-step.step-${step}`)
  });
});
