import React from 'react';
import { shallow } from 'enzyme';
import Registration from '../components/Registration/Registration';

describe('<Registration />', () => {
    const testValues = {
        firstName: 'john',
        lastName: 'doe',
        email: 'john@mail.com',
        password: 'password',
        handleSubmit: jest.fn(),
    };

    it('submit works', () => {

        const component = shallow(
            <Registration {...testValues} />
        );
        component.find('#submitButton').simulate('click');
        expect(testValues.handleSubmit).toHaveBeenCalledTimes(1);
        expect(testValues.handleSubmit).toBeCalledWith({firstName: testValues.firstName, lastName: testValues.lastName, email: testValues.email, password: testValues.password});
    });
});


// *****

// import React from 'react';
// import { shallow } from 'enzyme';
// import Registration from '../components/Registration/Registration';

// describe('<Registration />', () => {

//   it('has a first_name input field', () => {
//     const wrapper = shallow(<Registration />);
//     expect(wrapper.containsMatchingElement(<input type="text" />)).to.be.true;
//   });

//   it('has a last_name input field', () => {
//     const wrapper = shallow(<Registration />);
//     expect(wrapper.containsMatchingElement(<input type="text" />)).to.be.true;
//   });

//   it('has an email input field', () => {
//     const wrapper = shallow(<Registration />);
//     expect(wrapper.containsMatchingElement(<input type="email" />)).to.be.true;
//   });

//   it('has a password input field', () => {
//     const wrapper = shallow(<Registration />);
//     expect(wrapper.containsMatchingElement(<input type="password" />)).to.be.true;
//   });

//   it('has a Sign up button', () => {
//     const wrapper = shallow(<Registration />);
//     expect(wrapper.containsMatchingElement(<button type="submit">Sign up</button>)).to.be.true;
//   });

//   it('successfully registers new user', () => {
//     const first_name = 'John';
//     const last_name = 'Doe';
//     const email = 'john@mail.com';
//     const password = 'password';
//     const wrapper = shallow(<Login handleLogin={state => {
//       expect(state.email).to.be.equal(email);
//       expect(state.password).to.be.equal(password);
//     }}/>);
//     wrapper.setState({ email: 'john@mail.com', password: 'password'});
//     wrapper.find('button').simulate('click');
//   });
// });

// *****

// test('Registering users work as expected', async () => {
//   let user = {username: 'jestUser', password: 'jestUser'};

//   await expect(UserService._registerNewUser(user)).resolves.toEqual({
//       validated: true,
//       reason: 'You have successfully registered !',
//       user: {
//           password: expect.anything(),
//           username: 'jestUser'
//       }
//   });
// })


// describe('User signin', () => {
//   it('should fail if no credentials are provided', () => {
//       const fakeEvent = { preventDefault: () => console.log('preventDefault') };
//       const loginComponent = shallow(<Login />);
//       expect(loginComponent.find('.form-login').length).toBe(1);
//       loginComponent.find('.form-login').simulate('submit', fakeEvent);
//       expect(loginComponent.find(Notification).length).toBe(1);
//   });
// });

// *******