load("trainingData.txt");

%function for sigmoid calculation
function g = sigmoid(z)
	g = 1./(ones(size(z)) + exp(-z));
endfunction;

%function for calculating cost function and gradient
function [J, grad] = costFunction(theta, X, Y, lambda)
	m = length(Y);
	J = ((-1/m)*((Y'*log(sigmoid(X*theta)))+(1-Y)'*log(1-sigmoid(X*theta)))) + (0.5*lambda/m)*(theta'*theta - theta(1)*theta(1));
  temp = theta;
  temp(1) = 0;
  grad = (1/m)*(X'*(sigmoid(X*theta)-Y)) + (lambda/m)*temp;
endfunction;

function out = mapFeature(X1, X2)
  degree = 2;
  out = ones(size(X1(:,1)));
  for i = 1:degree
      for j = 0:i
          out(:, end+1) = (X1.^(i-j)).*(X2.^j);
      endfor;
  endfor;
endfunction;

X = trainingData(:, 1:2); %X without first column of all 1s
Y = trainingData(:, 3);
X = mapFeature(X(:,1), X(:,2));
initial_theta = zeros(size(X, 2), 1);
lambda = 0;

%minimising cost
options = optimset('GradObj', 'on', 'MaxIter', 400);
[theta, J] = fminunc(@(t)(costFunction(t, X, Y, lambda)), initial_theta, options);

%visualising training data
posY = trainingData(:, 1);
speed = trainingData(:, 2);
stat = trainingData(:, 3);
positive = find(stat == 1);
negative = find(stat == 0);
figure;
hold on;
plot(posY(positive), speed(positive), 'g+', 'LineWidth', 2, 'MarkerSize', 7);
plot(posY(negative), speed(negative), 'ro', 'LineWidth', 2, 'MarkerSize', 7);
u = linspace(0, 600, 601);
v = linspace(0, 52, 53);
z = zeros(length(u), length(v));
for i = 1:length(u)
  for j = 1:length(v)
    z(i,j) = mapFeature(u(i), v(j))*theta;
  end
end
z = z';
contour(u, v, z, [0, 0], 'LineWidth', 2)
hold off;

file = fopen("green.txt", "w");
for x = 0:591
  for y = 1:51
    if (mapFeature(x, y)*theta) >= 0
     fputs(file, num2str(x));
     fputs(file, " ");
     fputs(file, num2str(y));
     fputs(file, "\r\n");
    endif;
  endfor;
endfor;
fclose(file);