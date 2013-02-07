# UI 2 takeaway
Is a common set of UI patterns ready to use. Also provides basic views managing, basic UI handlers & default app icon

## UI guidelines
* **More UI components**: http://www.buildingfirefoxos.com (not Mozilla official)
* **App icons styleguide**: http://www.mozilla.org/en-US/styleguide/products/firefoxos/icons/

## View managing (js/views.js)
* Autogenerated js access `dom.view.myviewid` (js/ready.js)
* Provides basic views handling (go, back, home, getActive)
* Works with url hash, you can link directly to any view
* `data-showon` and `data-hideon` you can toggle visibility of any element in any desired view

## UI Handlers (js/ui.js)
* Toggle sidebar
* Edit mode
* Custom selects
* Sliders
* Back actions
* Clear fields

## Template engine (js/templates.js)
* Simple template parsrer
* `templates.parse(string, data)`

