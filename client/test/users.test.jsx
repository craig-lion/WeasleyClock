import 'regenerator-runtime/runtime';
import {
  describe, expect, it, beforeEach, afterEach, jest,
} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import Login from '../src/components/Login';

const domTestingLib = require('@testing-library/dom');

const { queryHelpers } = domTestingLib;

jest.mock('axios');

describe('users', () => {
  let wrapper;

  describe('authentication', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const postPromise = Promise.resolve({ data: true });
    axios.post.mockImplementation(() => postPromise);
    const setLoginUserName = jest.fn();
    const setIsLoggedIn = jest.fn();
    // const { asFragment } = render(<Login
    //   setLoginUserName={setLoginUserName}
    //   setIsLoggedIn={setIsLoggedIn}
    // />);

    // it('FragmentTest', () => {

    //   expect(asFragment()).toMatchSnapshot();
    // });

    beforeEach(() => {
      // wrapper = Enzyme.mount((<Login
      //   setLoginUserName={setLoginUserName}
      //   setIsLoggedIn={setIsLoggedIn}
      // />));
      wrapper = render(<Login
        setLoginUserName={setLoginUserName}
        setIsLoggedIn={setIsLoggedIn}
      />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('can create new user', async () => {
      const getById = queryHelpers.queryByAttribute.bind(null, 'id');
      fireEvent.click(getById(wrapper.container, 'newUser'));
      expect(axios.post).toHaveBeenCalledWith('/api/addUser', { userName: expect.any(String), password: expect.any(String) });
      await postPromise;
      expect(setLoginUserName).toHaveBeenCalledWith(expect.any(String));
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    });

    // it('existing user can login', async () => {
    //   const knownUser = wrapper.find('#knownUser').at(0);
    //   knownUser.simulate('click');
    //   expect(axios.post).toHaveBeenCalledWith('/api/login', { userName: expect.any(String), password: expect.any(String) });
    //   await postPromise;
    //   expect(setLoginUserName).toHaveBeenCalledWith(expect.any(String));
    //   expect(setIsLoggedIn).toHaveBeenCalledWith(true);

    //   const userName = wrapper.find('#userName').at(0);
    //   const password = wrapper.find('#password').at(0);

    //   userName.value = 'TestUser';
    //   userName.simulate('change', { target: userName });
    //   expect(setState).toHaveBeenCalledWith('TestUser');

    //   password.value = 'TestPass';
    //   password.simulate('change', { target: password });
    //   expect(setState).toHaveBeenCalledWith('TestPass');
    // });
  });
  // describe('friends', () => {

  // });
});

// describe("Title input", () => {
//   it("Should capture title correctly onChange", () => {
//       const title = wrapper.find("input").at(0);
//       title.instance().value = "Test";
//       title.simulate("change");
//       expect(setState).toHaveBeenCalledWith("Test");
//   });
// });
