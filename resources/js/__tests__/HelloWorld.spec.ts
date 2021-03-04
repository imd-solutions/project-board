// resources/js/__test__/HelloWorld.spec.ts
import {shallowMount} from "@vue/test-utils";
import HelloWorld from './../components/HelloWord.vue';

describe('HelloWorld.vue', () => {
    test('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(HelloWorld, {
            propsData: {msg}
        })
        expect(wrapper.text()).toContain('Welcome to ');
    })
})
