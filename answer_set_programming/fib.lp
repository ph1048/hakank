% 
% Fibonacci in ASP.
% 
% Note: For gringo n must be <= 45. 
% Unfortunately there is no arbitrary precision...

% 
% This was created by Hakan Kjellerstrand, hakank@gmail.com
% See also http://www.hakank.org/answer_set_programming/
%



#const n=45.
number(1..n).


fib(0, 1).
fib(1, 1).
fib(N, X1 + X2) :- number(N), N > 1, fib(N - 1, X1), fib(N - 2, X2).

% search(X) :- fib(X,Y), Y=21.

#hide.
#show fib(X,Y).
% #show search(X).
