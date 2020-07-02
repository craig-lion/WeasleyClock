// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import React from 'react';
import {
  describe, expect, it, beforeEach, afterEach, jest,
} from '@jest/globals';
import {
  render, fireEvent, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Login from '../src/components/Login';
import FriendsList from '../src/components/FriendsList';

const domTestingLib = require('@testing-library/dom');

const { queryHelpers } = domTestingLib;
const getById = queryHelpers.queryByAttribute.bind(null, 'id');

const mockSetState = jest.fn();
jest.mock('axios');

beforeEach(() => {
  jest.mock('react', () => ({
    useState: (initial) => [initial, mockSetState],
  }));
});

describe('Users', () => {
  let wrapper;
  describe('Login', () => {
    let setLoginUserName;
    let setIsLoggedIn;
    let postPromise;

    beforeEach(() => {
      postPromise = Promise.resolve({ data: true });
      axios.post.mockImplementation(() => postPromise);
      setLoginUserName = jest.fn();
      setIsLoggedIn = jest.fn();

      wrapper = render(<Login
        setLoginUserName={setLoginUserName}
        setIsLoggedIn={setIsLoggedIn}
      />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('can create new user', () => {
      // render form (in beforeEach)
      it('new user form data is correctly captured and sent to POST onClick', () => {
        // simulate change for userName
        fireEvent.change(getById(wrapper.container, 'userName'), { target: { value: 'Lion' } });
        // simulate change for pass
        fireEvent.change(getById(wrapper.container, 'password'), { target: { value: 'Lion' } });
        // wait for userName and pass to update
        // simulate click
        fireEvent.click(getById(wrapper.container, 'newUser'));
        // check if click triggers post request with proper data
        expect(axios.post).toHaveBeenCalledWith('/api/addUser', { userName: 'Lion', password: 'Lion' });
      });
      it('Updates LoginUserName and IsLoggedIn correctly upon sucessful login', async () => {
        // simulate change for userName
        fireEvent.change(getById(wrapper.container, 'userName'), { target: { value: 'Lion' } });
        // simulate click
        fireEvent.click(getById(wrapper.container, 'newUser'));
        // simulate successful login
        await postPromise;
        // setLoginUserName shout update userName with recieved string
        expect(setLoginUserName, 'setLoginUserName should have gotten a string but it did not').toHaveBeenCalledWith('Lion');
        // setIsLoggedIn should update to true
        expect(setIsLoggedIn, 'setIsLoggedIn should be true but it is not').toHaveBeenCalledWith(true);
      });
    });

    describe('existing user can login', () => {
      // render form (in beforeEach)
      it('known user form data is correctly captured and sent to POST onClick', () => {
        // simulate change for userName
        fireEvent.change(getById(wrapper.container, 'userName'), { target: { value: 'Lion' } });
        // simulate change for pass
        fireEvent.change(getById(wrapper.container, 'password'), { target: { value: 'Lion' } });
        // wait for userName and pass to update
        // simulate click
        fireEvent.click(getById(wrapper.container, 'knownUser'));
        // check if click triggers post request with proper data
        expect(axios.post).toHaveBeenCalledWith('/api/login', { userName: 'Lion', password: 'Lion' });
      });
      it('Updates LoginUserName and IsLoggedIn correctly upon sucessful login', async () => {
        // simulate change for userName
        fireEvent.change(getById(wrapper.container, 'userName'), { target: { value: 'Lion' } });
        // simulate click
        fireEvent.click(getById(wrapper.container, 'knownUser'));
        // simulate successful login
        await postPromise;
        // setLoginUserName shout update userName with recieved string
        expect(setLoginUserName, 'setLoginUserName should have gotten a string but it did not').toHaveBeenCalledWith('Lion');
        // setIsLoggedIn should update to true
        expect(setIsLoggedIn, 'setIsLoggedIn should be true but it is not').toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Friends', () => {
    // initialize state variables
    const friends = [];
    let handleLocations;
    let userName;
    let postPromise;
    let getPromise;
    let friendsList;

    // render component
    beforeEach(() => {
      handleLocations = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('Can Add/Remove Friend', () => {
      it('Clicking on Not Friend User Adds Them to Friend List', async () => {
        getPromise = Promise.resolve({ data: [{ userName: 'Lion' }, { userName: 'Lamb' }] });
        axios.get.mockImplementation(() => getPromise);
        act(() => {
          wrapper = render(<FriendsList
            friends={friends}
            handleLocations={handleLocations}
            userName={userName}
          />);
        });
        await act(async () => {
          postPromise = Promise.resolve({ data: ['Lion'] });
          axios.post.mockImplementation(() => postPromise);
          // simulate click
          await waitFor(() => (expect(getById(wrapper.container, 'Friend-ele-Lion')).toBeTruthy()));
          fireEvent.click(getById(wrapper.container, 'Friend-ele-Lion'));
          // expect POST to be called with array containing newFriend
          const data = { friends: ['Lion'] };
          expect(axios.post).toHaveBeenCalledWith('/api/updateFriends', data);
          // await promise
          await postPromise;
          // wait for setFriendsList to be called
          // await waitFor(() => (expect(setFriendsList).toHaveBeenCalled()));
          // expect friendsList to include newFriend
          // expect(friendsList).toContain('Lion');
        });
      });
      // for remove friend
      // expect POST to be called with array not containing lessFriend
      // expect setFriendsList to not include lessFriend
    });
  });
});