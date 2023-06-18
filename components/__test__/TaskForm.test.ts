import { mount } from '@vue/test-utils';
import TaskForm from '../TaskForm.vue';
import TaskButton from '../TaskButton.vue';

describe('TaskForm', () => {
  test('emits correct events with updated values when fields are changed and form is submitted', async () => {
    const wrapper = mount(TaskForm, {
      props: {
        name: '',
        description: '',
        priority: 0,
      },
      global: {
        components: {
          TaskButton,
        },
      },
    });

    await wrapper.find('input[name="name"]').setValue('Task Name');
    await wrapper
      .find('input[name="description"]')
      .setValue('Task Description');
    await wrapper.find('select[name="priority"]').setValue(2);

    expect(wrapper.emitted()).toHaveProperty('update:name');
    expect(wrapper.emitted()['update:name'][0]).toEqual(['Task Name']);
    expect(wrapper.emitted()).toHaveProperty('update:description');
    expect(wrapper.emitted()['update:description'][0]).toEqual([
      'Task Description',
    ]);
    expect(wrapper.emitted()).toHaveProperty('update:priority');
    expect(wrapper.emitted()['update:priority'][0]).toEqual(['2']);

    await wrapper.find('.task-form').trigger('submit');

    expect(wrapper.emitted()).toHaveProperty('submit');
  });
});
