import 'regenerator-runtime/runtime';
import {
  describe, expect, it, test, beforeEach, afterEach, jest,
} from '@jest/globals';
import Enzyme from 'enzyme';
import React, { useState } from 'react';
import axios from 'axios';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../src/components/Login';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');

describe('users', () => {
  describe('authentication', () => {
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    const postPromise = Promise.resolve({ data: true });
    axios.post.mockImplementation(() => postPromise);
    const setLoginUserName = jest.fn();
    const setIsLoggedIn = jest.fn();


    beforeEach(() => {
      wrapper = Enzyme.mount((<Login setLoginUserName={setLoginUserName} setIsLoggedIn={setIsLoggedIn} />));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('can create new user', async () => {
      const userName = wrapper.find('#userName').at(0);
      const password = wrapper.find('#password').at(0);
      userName.value = 'TestUser';
      userName.simulate('change', { target: userName });
      expect(setState).toHaveBeenCalledWith('TestUser');
      password.value = 'TestPass';
      password.simulate('change', { target: password });
      expect(setState).toHaveBeenCalledWith('TestPass');
      const knownUser = wrapper.find('#knownUser').at(0);
      const newUser = wrapper.find('#newUnser').at(0);
      knownUser.simulate('click');
      expect(axios.post).toHaveBeenCalledWith('/api/login', { userName: expect.any(String), password: expect.any(String) });
      await postPromise;
      expect(setLoginUserName).toHaveBeenCalledWith(expect.any(String));
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    });
  });
  describe('friends', () => {});
});

// describe("Title input", () => {
//   it("Should capture title correctly onChange", () => {
//       const title = wrapper.find("input").at(0);
//       title.instance().value = "Test";
//       title.simulate("change");
//       expect(setState).toHaveBeenCalledWith("Test");
//   });
// });
