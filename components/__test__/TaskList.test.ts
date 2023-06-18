import { mount } from '@vue/test-utils';
import TaskList from '../TaskList.vue';
import TaskItem from '../TaskItem.vue';
import TaskButton from '../TaskButton.vue';
import TaskBadge from '../TaskBadge.vue';

describe('TaskList.vue', () => {
  it('renders task items correctly', () => {
    const tasks = [
      {
        id: 1,
        name: 'Test task 1',
        description: 'Test description 1',
        priority: 1,
      },
      {
        id: 2,
        name: 'Test task 2',
        description: 'Test description 2',
        priority: 2,
      },
    ];

    const wrapper = mount(TaskList, {
      props: { tasks },
      global: {
        components: {
          TaskItem,
          TaskButton,
          TaskBadge,
        },
      },
    });

    const taskItems = wrapper.findAllComponents(TaskItem);
    expect(taskItems.length).toBe(tasks.length);

    tasks.forEach((task, index) => {
      const taskItem = taskItems[index];
      expect(taskItem.props()).toEqual({
        name: task.name,
        description: task.description,
        priority: task.priority,
      });
    });
  });

  it('emits "edit" event with task data when a task item emits "edit"', async () => {
    const tasks = [
      {
        id: 1,
        name: 'Test task 1',
        description: 'Test description 1',
        priority: 1,
      },
    ];

    const wrapper = mount(TaskList, {
      props: { tasks },
      global: {
        components: {
          TaskItem,
          TaskButton,
          TaskBadge,
        },
      },
    });

    const taskItem = wrapper.findComponent(TaskItem);
    await taskItem.vm.$emit('edit');

    expect(wrapper.emitted()).toHaveProperty('edit');
    expect(wrapper.emitted().edit[0]).toEqual([tasks[0]]);
  });

  it('emits "delete" event with task id when a task item emits "delete"', async () => {
    const tasks = [
      {
        id: 1,
        name: 'Test task 1',
        description: 'Test description 1',
        priority: 1,
      },
    ];

    const wrapper = mount(TaskList, {
      props: { tasks },
      global: {
        components: {
          TaskItem,
          TaskButton,
          TaskBadge,
        },
      },
    });

    const taskItem = wrapper.findComponent(TaskItem);
    await taskItem.vm.$emit('delete');

    expect(wrapper.emitted()).toHaveProperty('delete');
    expect(wrapper.emitted().delete[0]).toEqual([tasks[0].id]);
  });
});
