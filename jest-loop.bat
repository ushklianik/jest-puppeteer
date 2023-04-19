@echo off
for /l %%x in (1, 1, 50) do (
  call npx jest --maxWorkers=1
)