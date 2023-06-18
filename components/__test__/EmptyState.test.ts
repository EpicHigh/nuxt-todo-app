import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import EmptyState from '../EmptyState.vue';

describe('EmptyState', () => {
  test('renders slot content', () => {
    const SlotComponent = defineComponent({
      template: '<div class="slot-content">Slot Content</div>',
    });

    const wrapper = mount(EmptyState, {
      slots: {
        default: SlotComponent,
      },
    });

    expect(wrapper.find('.slot-content').text()).toBe('Slot Content');
  });

  test('triggers a click event', async () => {
    const wrapper = mount(EmptyState);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted().click.length).toBe(1);
  });
});
