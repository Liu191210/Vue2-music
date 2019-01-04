import { get, post } from './request'
export const banner = data => get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', data)
export const ranking = data => get('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', data)
export const search = data => get('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', data)
export const searchForm = data => get('https://api.bzqll.com/music/tencent/search', data)
export const rankingList = data => get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', data)
export const songApi = (url,data) => get(url, data)