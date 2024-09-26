```mermaid
sequenceDiagram
		participant browser
		participant server

		browser->>browser: Form submit event (prevent default handling of form's submit)
		browser->>browser: New note (content + date) created and added to notes list
		browser->>browser: Rerenders note list on the page
		browser->>server: POST /new_note_spa with JSON
		activate server
		server-->>browser: 201 created (no redirect)
		deactivate server
```