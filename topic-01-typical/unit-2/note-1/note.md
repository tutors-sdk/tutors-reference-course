# Note 1

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


# Mermaid Diagrams

Tutors supports [Mermaid.js](https://mermaid.js.org/) diagrams directly in markdown content. Use standard fenced code blocks with the `mermaid` language identifier.

## Flowchart

```mermaid
flowchart TD
    A[Student visits course] --> B{Authenticated?}
    B -->|Yes| C[Load dashboard]
    B -->|No| D[Show public content]
    C --> E[Track progress]
    D --> F[Browse topics]
    E --> F
    F --> G[Open learning object]
    G --> H{Type?}
    H -->|Lab| I[Step-by-step instructions]
    H -->|Talk| J[PDF slides]
    H -->|Note| K[Markdown content]
    H -->|Notebook| L[Interactive Python]
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant S as Student
    participant T as Tutors Reader
    participant API as Course API
    participant DB as Supabase

    S->>T: Visit course URL
    T->>API: Fetch tutors.json
    API-->>T: Course data
    T->>T: Build learning object tree
    T-->>S: Render course view
    S->>T: Navigate to lab
    T->>T: Convert markdown to HTML
    T-->>S: Display lab step
    S->>DB: Record time on task
```

## Class Diagram

```mermaid
classDiagram
    class Lo {
        +string type
        +string title
        +string summary
        +string route
        +string img
        +Lo[] los
    }
    class Lab {
        +Lo[] los
        +string type = "lab"
    }
    class Note {
        +string contentHtml
        +string type = "note"
    }
    class Notebook {
        +NotebookCell[] cells
        +string kernelLanguage
        +string type = "notebook"
    }
    class Talk {
        +string pdf
        +string type = "talk"
    }
    Lo <|-- Lab
    Lo <|-- Note
    Lo <|-- Notebook
    Lo <|-- Talk
```

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Browsing
    Browsing --> Authenticated: Sign in
    Authenticated --> Browsing: Sign out
    Browsing --> ViewingTopic: Select topic
    ViewingTopic --> ViewingLab: Open lab
    ViewingLab --> ViewingStep: Navigate steps
    ViewingStep --> ViewingLab: Back to lab
    ViewingLab --> ViewingTopic: Back to topic
    ViewingTopic --> Browsing: Back to course
```

## Entity Relationship Diagram

```mermaid
erDiagram
    COURSE ||--o{ TOPIC : contains
    TOPIC ||--o{ UNIT : contains
    UNIT ||--o{ LAB : contains
    UNIT ||--o{ TALK : contains
    UNIT ||--o{ NOTE : contains
    UNIT ||--o{ NOTEBOOK : contains
    LAB ||--o{ STEP : contains
    NOTEBOOK ||--o{ CELL : contains
    CELL {
        string cellType
        string source
        string outputsHtml
    }
```

## Gantt Chart

```mermaid
gantt
    title Course Development Timeline
    dateFormat YYYY-MM-DD
    section Content
        Write labs           :a1, 2024-01-01, 30d
        Create talks         :a2, after a1, 20d
        Add notebooks        :a3, after a2, 15d
    section Review
        Peer review          :b1, after a3, 10d
        Student testing      :b2, after b1, 14d
    section Deploy
        Generate JSON        :c1, after b2, 2d
        Deploy to Netlify    :c2, after c1, 1d
```

## Pie Chart

```mermaid
pie title Content Types in a Typical Course
    "Labs" : 40
    "Talks" : 25
    "Notes" : 15
    "Notebooks" : 10
    "Videos" : 10
```

## Usage

To include a Mermaid diagram in any note, lab step, or panel note, simply use a fenced code block:

~~~
```mermaid
flowchart LR
    A --> B --> C
```
~~~

Mermaid diagrams are rendered client-side and support all standard Mermaid diagram types including flowcharts, sequence diagrams, class diagrams, state diagrams, ER diagrams, Gantt charts, pie charts, and more.
