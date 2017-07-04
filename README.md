# Next.js-example [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/totofish/NextStarter/master/LICENSE)

使用 next.js + next-routes + react-redux + redux-saga + scss + jest + PWA 基礎架構

## How to use

Install it and run:

```bash
yarn install
yarn run dev
```

Production deployment

```bash
yarn run build
yarn run start
```

Test

```bash
yarn run test
yarn run coverage
```

## 架構特點
> 使用scss文件作為全域Stylesheet
>
> 實作Progressive Web App，offline瀏覽
>
> 使用redux-saga，並且在Action中附加Promise方法讓在getInitialProps中也能使用


多筆Action發送

```javascript
static async getInitialProps({ store }) {
	let action = getIP();
	store.dispatch(action);
	
	return Promise.all([action]).then((value) => {
		return { ip: value[0].ip };
	}).catch(function(error){
		return {};
	});
}
```

單筆Action發送

```javascript
static async getInitialProps({ store }) {
	let action = getIP();
	store.dispatch(action);
	
	return action.Promise.then((value) => {
		return { ip: value.ip }; 
	}, (error) => {
		return  }; 
	});
}
```

其他方式callback

```javascript
static async getInitialProps({ store }) {
	return new Promise((resolve, reject) => {
		store.dispatch(getIP({
			callback: (res) => {
				resolve(res);
			}
		}));
	}).then((res) => {
	  return { stars: json.stargazers_count }; 
	});
}
```