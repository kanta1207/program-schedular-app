
dcb:
	docker-compose build
dcu:
	docker-compose up
dcu-d:
	docker-compose up -d
dcd:
	docker-compose down
migration-create:
	docker exec -it program-scheduler-api sh -c "npm run migration:create"
migration-generate:
	docker exec -it program-scheduler-api sh -c "npm run migration:generate"
# accept name as an argument
MIGRATION_NAME ?=
migration-named-generate:
	docker exec -it program-scheduler-api sh -c "npm run migration:generate -- --name=$(MIGRATION_NAME)"
migration-run:
	docker exec -it program-scheduler-api sh -c "npm run migration:run"
migration-revert:
	docker exec -it program-scheduler-api sh -c "npm run migration:revert"
seed:
	docker exec -it program-scheduler-api sh -c "npm run seed"