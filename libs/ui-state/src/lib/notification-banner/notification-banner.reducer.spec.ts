import { State, initialState, reducer } from './notification-banner.reducer';
import {
  NBActionTypes,
  AddBanner,
  SetBanner,
  RemoveBanner,
  DoBannerActionSuccess
} from './notification-banner.actions';
import { Banner } from '../../models';

describe('Notification Banner reducer', () => {
  it('AddBanner', () => {
    const banner: Banner = {
      id: '_test-banner',
      index: 0,
      desc: 'This is only a test',
      buttonText: 'Close',
      action: () => {
        console.log('void');
      },
      color: 'accent'
    };
    const state: State = { ...initialState };
    const action: AddBanner = {
      type: NBActionTypes.AddBanner,
      payload: banner
    };
    const result = reducer(state, action);
    expect(result).toEqual({ ...state, banners: [banner] });
  });

  it('SetBanner', () => {
    const banner: Banner = {
      id: '_test-banner',
      index: 0,
      desc: 'This is only a test',
      buttonText: 'Close',
      action: () => {
        console.log('void');
      },
      color: 'accent'
    };
    const state: State = { ...initialState, banners: [banner] };
    const action: SetBanner = {
      type: NBActionTypes.SetBanner,
      payload: banner.id
    };
    const result = reducer(state, action);
    expect(result).toEqual({ ...state, activeBanner: banner.id });
  });

  it('RemoveBanner', () => {
    const banner: Banner = {
      id: '_test-banner',
      index: 0,
      desc: 'This is only a test',
      buttonText: 'Close',
      action: () => {
        console.log('void');
      },
      color: 'accent'
    };
    const state: State = {
      ...initialState,
      banners: [banner],
      activeBanner: '_test-banner-2'
    };
    const action: RemoveBanner = {
      type: NBActionTypes.RemoveBanner,
      payload: banner.id
    };
    const result = reducer(state, action);
    expect(!result.banners.find(b => b.id === banner.id)).toBeTruthy();
    expect(result.activeBanner).toEqual('_test-banner-2');
  });

  it('DoBannerActionSuccess', () => {
    const banner: Banner = {
      id: '_test-banner',
      index: 0,
      desc: 'This is only a test',
      buttonText: 'Close',
      action: () => {
        console.log('void');
      },
      color: 'accent'
    };
    const state: State = {
      ...initialState,
      banners: [banner],
      activeBanner: banner.id
    };
    const action: DoBannerActionSuccess = {
      type: NBActionTypes.DoBannerActionSuccess,
      payload: banner.id
    };
    const result = reducer(state, action);
    expect(!result.banners.find(b => b.id === banner.id)).toBeTruthy();
    expect(result.activeBanner).toEqual('');
  });
});
