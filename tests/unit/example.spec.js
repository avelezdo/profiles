import { shallowMount } from '@vue/test-utils';
import Profiles from '@/components/Profiles.vue';
import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';

describe('Profiles.vue', () => {
	it('renders props.profiles profiles passed', () => {
		const wrapper = shallowMount(Profiles, {
			propsData: { profiles: [] },
		});
		expect(wrapper.props().profiles).toStrictEqual([]);
	});

	it('display profiles', () => {
		render();
	});
});
