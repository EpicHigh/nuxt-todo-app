import { mount } from '@vue/test-utils';
import TaskItem from '../TaskItem.vue';
import TaskBadge from '../TaskBadge.vue';
import TaskButton from '../TaskButton.vue';

describe('TaskItem', () => {
  it('renders task item correctly', () => {
    const wrapper = mount(TaskItem, {
      props: {
        name: 'Test task',
        description: 'Test description',
        priority: 2,
      },
      global: {
        components: {
          TaskBadge,
          TaskButton,
        },
      },
    });

    expect(wrapper.find('.task-name').text()).toBe('Test task');
    expect(wrapper.find('.task-description p').text()).toBe('Test description');
    expect(wrapper.findComponent({ name: 'TaskBadge' }).props('priority')).toBe(
      2
    );
  });

  it('emits "edit" event when the edit button is clicked', async () => {
    const wrapper = mount(TaskItem, {
      props: {
        name: 'Test task',
        description: 'Test description',
        priority: 2,
      },
      global: {
        components: {
          TaskBadge,
          TaskButton,
        },
      },
    });

    await wrapper.find('[data-test="edit-button"]').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('edit');
  });

  it('emits "delete" event when the delete button is clicked', async () => {
    const wrapper = mount(TaskItem, {
      props: {
        name: 'Test task',
        description: 'Test description',
        priority: 2,
      },
      global: {
        components: {
          TaskBadge,
          TaskButton,
        },
      },
    });

    await wrapper.find('[data-test="delete-button"]').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('delete');
  });
});
