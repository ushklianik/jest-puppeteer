#!/bin/bash
for i in {1..50}
do
  npx jest --maxWorkers=1
done