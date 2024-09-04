main:
	docker build -t asia-northeast1-docker.pkg.dev/$(PROJECT)/image/kancolle-ios-debugger .
	docker push asia-northeast1-docker.pkg.dev/$(PROJECT)/image/kancolle-ios-debugger
	gcloud run deploy kancolle-ios-debugger \
		--image asia-northeast1-docker.pkg.dev/$(PROJECT)/image/kancolle-ios-debugger \
		--region asia-northeast1 \
		--project $(PROJECT) \
		--allow-unauthenticated

upload:
	gsutil cp Kancolle_iOS_debug.js gs://$(BUCKET)/
