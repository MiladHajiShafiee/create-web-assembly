run_c_to_js: ./source/*.c
	emcc ./source/*.c -o ./build/$(FILENAME).js

run_c_to_html: ./source/*.c
	emcc ./source/*.c -o ./build/$(FILENAME).html

run_cpp_to_js: ./source/*.cpp
	em++ ./source/*.cpp -o ./build/$(FILENAME).js

run_cpp_to_html: ./source/*.cpp
	em++ ./source/*.cpp -o ./build/$(FILENAME).html


run_c_to_js_optLevel_-O1: ./source/*.c
	emcc -O1 ./source/*.c -o ./build/$(FILENAME).js

run_c_to_html_optLevel_-O1: ./source/*.c
	emcc -O1 ./source/*.c -o ./build/$(FILENAME).html

run_cpp_to_js_optLevel_-O1: ./source/*.cpp
	em++ -O1 ./source/*.cpp -o ./build/$(FILENAME).js

run_cpp_to_html_optLevel_-O1: ./source/*.cpp
	em++ -O1 ./source/*.cpp -o ./build/$(FILENAME).html


run_c_to_js_optLevel_-O2: ./source/*.c
	emcc -O2 ./source/*.c -o ./build/$(FILENAME).js

run_c_to_html_optLevel_-O2: ./source/*.c
	emcc -O2 ./source/*.c -o ./build/$(FILENAME).html

run_cpp_to_js_optLevel_-O2: ./source/*.cpp
	em++ -O2 ./source/*.cpp -o ./build/$(FILENAME).js

run_cpp_to_html_optLevel_-O2: ./source/*.cpp
	em++ -O2 ./source/*.cpp -o ./build/$(FILENAME).html
