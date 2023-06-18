import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import CommonDialog from '../CommonDialog.vue';

describe('CommonDialog', () => {
  test('emits close event when close button is clicked', async () => {
    const wrapper = mount(CommonDialog);

    await wrapper.find('.close-button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.emitted().close.length).toBe(1);
  });

  test('renders slot content', async () => {
    const SlotComponent = defineComponent({
      template: '<div class="slot-content">Slot Content</div>',
    });

    const wrapper = mount(CommonDialog, {
      slots: {
        default: SlotComponent,
      },
    });

    expect(wrapper.find('.slot-content').text()).toBe('Slot Content');
  });
});
