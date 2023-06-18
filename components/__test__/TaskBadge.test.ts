import { mount } from '@vue/test-utils';
import TaskBadge from '../TaskBadge.vue';

describe('TaskBadge', () => {
  test('renders correct content and class for each priority', () => {
    const priorities = [
      { value: 3, text: 'High', class: 'high-priority' },
      { value: 2, text: 'Medium', class: 'medium-priority' },
      { value: 1, text: 'Low', class: 'low-priority' },
      { value: 0, text: 'Unknown', class: 'unknown-priority' },
      { value: 4, text: 'Unknown', class: 'unknown-priority' },
    ];

    priorities.forEach((priority) => {
      const wrapper = mount(TaskBadge, {
        props: { priority: priority.value },
      });

      const span = wrapper.find('.priority');

      expect(span.text()).toBe(priority.text);
      expect(span.classes()).toContain(priority.class);
    });
  });
});
