/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/indexregulering/route";
exports.ids = ["app/api/indexregulering/route"];
exports.modules = {

/***/ "(rsc)/./app/api/indexregulering/route.ts":
/*!******************************************!*\
  !*** ./app/api/indexregulering/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function POST(req) {\n    const { table, fromMonth, toMonth } = await req.json();\n    const response = await fetch(`https://data.ssb.no/api/v0/no/table/${table}`, {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            query: [\n                {\n                    code: \"Tid\",\n                    selection: {\n                        filter: \"item\",\n                        values: [\n                            fromMonth,\n                            toMonth\n                        ]\n                    }\n                }\n            ],\n            response: {\n                format: \"json-stat2\"\n            }\n        })\n    });\n    const data = await response.json();\n    console.log(\"SSB DATA:\", JSON.stringify(data, null, 2));\n    const values = data.value ?? [];\n    if (values.length < 2) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            percent: 0\n        });\n    }\n    const oldValue = values[0];\n    const newValue = values[1];\n    const percent = (newValue - oldValue) / oldValue * 100;\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        oldValue,\n        newValue,\n        percent\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2luZGV4cmVndWxlcmluZy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUVwQyxlQUFlQyxLQUFLQyxHQUFZO0lBQ3JDLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxTQUFTLEVBQUVDLE9BQU8sRUFBRSxHQUNqQyxNQUFNSCxJQUFJSSxJQUFJO0lBRWhCLE1BQU1DLFdBQVcsTUFBTUMsTUFDckIsQ0FBQyxvQ0FBb0MsRUFBRUwsT0FBTyxFQUM5QztRQUNFTSxRQUFRO1FBQ1JDLFNBQVM7WUFDUCxnQkFDRTtRQUNKO1FBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztZQUNuQkMsT0FBTztnQkFDTDtvQkFDRUMsTUFBTTtvQkFDTkMsV0FBVzt3QkFDVEMsUUFBUTt3QkFDUkMsUUFBUTs0QkFDTmQ7NEJBQ0FDO3lCQUNEO29CQUNIO2dCQUNGO2FBQ0Q7WUFDREUsVUFBVTtnQkFDUlksUUFBUTtZQUNWO1FBQ0Y7SUFDRjtJQUdGLE1BQU1DLE9BQ0osTUFBTWIsU0FBU0QsSUFBSTtJQUNuQmUsUUFBUUMsR0FBRyxDQUFHLGFBQ2hCVixLQUFLQyxTQUFTLENBQUNPLE1BQU0sTUFBTTtJQUczQixNQUFNRixTQUNKRSxLQUFLRyxLQUFLLElBQUksRUFBRTtJQUVsQixJQUFJTCxPQUFPTSxNQUFNLEdBQUcsR0FBRztRQUNyQixPQUFPeEIscURBQVlBLENBQUNNLElBQUksQ0FBQztZQUN2Qm1CLFNBQVM7UUFDWDtJQUNGO0lBRUEsTUFBTUMsV0FBV1IsTUFBTSxDQUFDLEVBQUU7SUFDMUIsTUFBTVMsV0FBV1QsTUFBTSxDQUFDLEVBQUU7SUFFMUIsTUFBTU8sVUFDSixDQUFFRSxXQUFXRCxRQUFPLElBQ2xCQSxXQUNGO0lBRUYsT0FBTzFCLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7UUFDdkJvQjtRQUNBQztRQUNBRjtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zbm9ycmVrci9obS1tYWxlcnNlcnZpY2UtcXVvdGUvYXBwL2FwaS9pbmRleHJlZ3VsZXJpbmcvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICBjb25zdCB7IHRhYmxlLCBmcm9tTW9udGgsIHRvTW9udGggfSA9XG4gICAgYXdhaXQgcmVxLmpzb24oKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgIGBodHRwczovL2RhdGEuc3NiLm5vL2FwaS92MC9uby90YWJsZS8ke3RhYmxlfWAsXG4gICAge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjpcbiAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcXVlcnk6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb2RlOiBcIlRpZFwiLFxuICAgICAgICAgICAgc2VsZWN0aW9uOiB7XG4gICAgICAgICAgICAgIGZpbHRlcjogXCJpdGVtXCIsXG4gICAgICAgICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgICAgIGZyb21Nb250aCxcbiAgICAgICAgICAgICAgICB0b01vbnRoXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgZm9ybWF0OiBcImpzb24tc3RhdDJcIlxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgKTtcblxuICBjb25zdCBkYXRhID1cbiAgICBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coICBcIlNTQiBEQVRBOlwiLFxuICBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKVxuKTtcblxuICBjb25zdCB2YWx1ZXMgPVxuICAgIGRhdGEudmFsdWUgPz8gW107XG5cbiAgaWYgKHZhbHVlcy5sZW5ndGggPCAyKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHBlcmNlbnQ6IDBcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IG9sZFZhbHVlID0gdmFsdWVzWzBdO1xuICBjb25zdCBuZXdWYWx1ZSA9IHZhbHVlc1sxXTtcblxuICBjb25zdCBwZXJjZW50ID1cbiAgICAoKG5ld1ZhbHVlIC0gb2xkVmFsdWUpIC9cbiAgICAgIG9sZFZhbHVlKSAqXG4gICAgMTAwO1xuXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgb2xkVmFsdWUsXG4gICAgbmV3VmFsdWUsXG4gICAgcGVyY2VudFxuICB9KTtcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcSIsInRhYmxlIiwiZnJvbU1vbnRoIiwidG9Nb250aCIsImpzb24iLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicXVlcnkiLCJjb2RlIiwic2VsZWN0aW9uIiwiZmlsdGVyIiwidmFsdWVzIiwiZm9ybWF0IiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsImxlbmd0aCIsInBlcmNlbnQiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/indexregulering/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Findexregulering%2Froute&page=%2Fapi%2Findexregulering%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Findexregulering%2Froute.ts&appDir=%2FUsers%2Fsnorrekr%2Fhm-malerservice-quote%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsnorrekr%2Fhm-malerservice-quote&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Findexregulering%2Froute&page=%2Fapi%2Findexregulering%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Findexregulering%2Froute.ts&appDir=%2FUsers%2Fsnorrekr%2Fhm-malerservice-quote%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsnorrekr%2Fhm-malerservice-quote&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_snorrekr_hm_malerservice_quote_app_api_indexregulering_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/indexregulering/route.ts */ \"(rsc)/./app/api/indexregulering/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"export\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/indexregulering/route\",\n        pathname: \"/api/indexregulering\",\n        filename: \"route\",\n        bundlePath: \"app/api/indexregulering/route\"\n    },\n    resolvedPagePath: \"/Users/snorrekr/hm-malerservice-quote/app/api/indexregulering/route.ts\",\n    nextConfigOutput,\n    userland: _Users_snorrekr_hm_malerservice_quote_app_api_indexregulering_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZpbmRleHJlZ3VsZXJpbmclMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmluZGV4cmVndWxlcmluZyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmluZGV4cmVndWxlcmluZyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnNub3JyZWtyJTJGaG0tbWFsZXJzZXJ2aWNlLXF1b3RlJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRnNub3JyZWtyJTJGaG0tbWFsZXJzZXJ2aWNlLXF1b3RlJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PWV4cG9ydCZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNzQjtBQUNuRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3Nub3JyZWtyL2htLW1hbGVyc2VydmljZS1xdW90ZS9hcHAvYXBpL2luZGV4cmVndWxlcmluZy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJleHBvcnRcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvaW5kZXhyZWd1bGVyaW5nL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvaW5kZXhyZWd1bGVyaW5nXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9pbmRleHJlZ3VsZXJpbmcvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvc25vcnJla3IvaG0tbWFsZXJzZXJ2aWNlLXF1b3RlL2FwcC9hcGkvaW5kZXhyZWd1bGVyaW5nL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Findexregulering%2Froute&page=%2Fapi%2Findexregulering%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Findexregulering%2Froute.ts&appDir=%2FUsers%2Fsnorrekr%2Fhm-malerservice-quote%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsnorrekr%2Fhm-malerservice-quote&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Findexregulering%2Froute&page=%2Fapi%2Findexregulering%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Findexregulering%2Froute.ts&appDir=%2FUsers%2Fsnorrekr%2Fhm-malerservice-quote%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsnorrekr%2Fhm-malerservice-quote&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();