# Note 5

This is an example of a note. 

It can have images:

![](img/01.png)

A code block with syntax highlighting:

### user-api-test.js

~~~javascript
import { playtimeService } from "./playtime-service.js";

suite("User API tests", () => {
  setup(async () => {
  });
  teardown(async () => {
  });

  test("create a user", async () => {
  });
});
~~~

### Mathematical notation:

$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$

This is an inline exampe: $c = \pm\sqrt{a^2 + b^2}$ with text before and after


### Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


# Videos & Podcasts

You can have either short videos, that can be bundled into the img folder, or you can have a youtube player.

## Video

An example of a short bundled video:

::video[src="./img/video.mov"]::

The above is displayed using a convenient shortcut like this:

![](img/video-1.png)

You can also associate a "poster" image, displayed before the image is played:

::video[src="./img/video.mov" poster="img/01.png"]::

![](img/video-2.png)

The video file and the poster must be in the img folder.

## Embedded Youtube Player

You will need the id from Youtube, then include like this:

![](img/video-3.png)

This is how it will look:

::video[src="O6Jh_1bxDs4"]::


## Podcast

A podcast hosted on spotify

::podcast[src="4j8JuxWeYY9MTmUasBJKAV"]::

This is the custom element:

![](img/podcast-1.png)

You can identify this id by locating the podcast on Spotify and select “Share->Copy link to episode”. 

### Links to Archives

You can link to zipped archives:

- [Solutions](./archives/archive.zip)