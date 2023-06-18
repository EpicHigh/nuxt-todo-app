import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import TaskButton from '../TaskButton.vue';

describe('TaskButton', () => {
  test('renders slot content', () => {
    const SlotComponent = defineComponent({
      template: '<div class="slot-content">Slot Content</div>',
    });

    const wrapper = mount(TaskButton, {
      slots: {
        default: SlotComponent,
      },
    });

    expect(wrapper.find('.slot-content').text()).toBe('Slot Content');
  });

  test('has correct default type', () => {
    const wrapper = mount(TaskButton);
    expect(wrapper.attributes('type')).toBe('button');
  });

  test('accepts different button type', () => {
    const wrapper = mount(TaskButton, {
      props: {
        type: 'submit',
      },
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });

  test('triggers a click event', async () => {
    const wrapper = mount(TaskButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
