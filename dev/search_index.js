var documenterSearchIndex = {"docs":
[{"location":"interface/#Interface-for-using-the-Interpolations-object","page":"Interface","title":"Interface for using the Interpolations object","text":"","category":"section"},{"location":"interface/","page":"Interface","title":"Interface","text":"We will again use the same data as the previous tutorial to demonstrate how to use the Interpolations object for computing interpolated values at any time point, as well as derivatives and integrals.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"using DataInterpolations\n\n# Dependent variable\nu = [14.7, 11.51, 10.41, 14.95, 12.24, 11.22]\n\n# Independent variable\nt = [0.0, 62.25, 109.66, 162.66, 205.8, 252.3]","category":"page"},{"location":"interface/#Interpolated-values","page":"Interface","title":"Interpolated values","text":"","category":"section"},{"location":"interface/","page":"Interface","title":"Interface","text":"All interpolation methods return an object from which we can compute the value of the dependent variable at any time point.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"We will use the CubicSpline method for demonstration, but the API is the same for all the methods. We can also pass the extrapolate = true keyword if we want to allow the interpolation to go beyond the range of the timepoints. The default value is extrapolate = false.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"A1 = CubicSpline(u, t)\n\n# For interpolation do, A(t)\nA1(100.0)\n\nA2 = CubicSpline(u, t; extrapolate = true)\n\n# Extrapolation\nA2(300.0)","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"note: Note\nThe values computed beyond the range of the time points provided during interpolation will not be reliable, as these methods only perform well within the range and the first/last piece polynomial fit is extrapolated on either side which might not reflect the true nature of the data.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"The keyword safetycopy = false can be passed to make sure no copies of u and t are made when initializing the interpolation object.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"A3 = QuadraticInterpolation(u, t; safetycopy = false)\n\n# Check for same memory\nu === A3.u.parent","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"Note that this does not prevent allocation in every interpolation constructor call, because parameter values are cached for all interpolation types except ConstantInterpolation.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"Because of the caching of parameters which depend on u and t, this data should not be mutated. Therefore u and t are wrapped in a ReadOnlyArray from ReadOnlyArrays.jl.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"A3.t[2] = 3.14","category":"page"},{"location":"interface/#Derivatives","page":"Interface","title":"Derivatives","text":"","category":"section"},{"location":"interface/","page":"Interface","title":"Interface","text":"Derivatives of the interpolated curves can also be computed at any point for all the methods. Derivatives upto second order is supported where first order derivative is computed analytically and second order using ForwardDiff.jl. Order is passed as the third argument. It is 1 by default.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"We will continue with the above example, but the API is the same for all the methods. If the interpolation is defined with extrapolate=true, derivatives can also be extrapolated.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"# derivative(A, t)\nDataInterpolations.derivative(A1, 1.0, 1)\nDataInterpolations.derivative(A1, 1.0, 2)\n\n# Extrapolation\nDataInterpolations.derivative(A2, 300.0)","category":"page"},{"location":"interface/#Integrals","page":"Interface","title":"Integrals","text":"","category":"section"},{"location":"interface/","page":"Interface","title":"Interface","text":"Integrals of the interpolated curves can also be computed easily.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"note: Note\nIntegrals for LagrangeInterpolation, BSplineInterpolation, BSplineApprox, Curvefit will error as there are no simple analytical solutions available. Please use numerical methods instead, such as Integrals.jl.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"To compute the integrals from the start of time points provided during interpolation to any point, we can do:","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"# integral(A, t)\nDataInterpolations.integral(A1, 5.0)","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"If we want to compute integrals between two points, we can do:","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"# integral(A, t1, t2)\nDataInterpolations.integral(A1, 1.0, 5.0)","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"Again, if the interpolation is defined with extrapolate=true, the integral can be computed beyond the range of the timepoints.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"# integral(A, t1, t2)\nDataInterpolations.integral(A2, 200.0, 300.0)","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"note: Note\nIf the times provided in the integral go beyond the range of the time points provided during interpolation, it uses extrapolation methods to compute the values, and hence the integral can be misrepsentative and might not reflect the true nature of the data.","category":"page"},{"location":"manual/#Methods","page":"Manual","title":"Methods","text":"","category":"section"},{"location":"manual/","page":"Manual","title":"Manual","text":"LinearInterpolation\nQuadraticInterpolation\nLagrangeInterpolation\nAkimaInterpolation\nConstantInterpolation\nQuadraticSpline\nCubicSpline\nBSplineInterpolation\nBSplineApprox\nCubicHermiteSpline\nQuinticHermiteSpline","category":"page"},{"location":"manual/#DataInterpolations.LinearInterpolation","page":"Manual","title":"DataInterpolations.LinearInterpolation","text":"LinearInterpolation(u, t; extrapolate = false)\n\nIt is the method of interpolating between the data points using a linear polynomial. For any point, two data points one each side are chosen and connected with a line. Extrapolation extends the last linear polynomial on each side.\n\nArguments\n\nu: data points.\nt: time points.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.QuadraticInterpolation","page":"Manual","title":"DataInterpolations.QuadraticInterpolation","text":"QuadraticInterpolation(u, t, mode = :Forward; extrapolate = false)\n\nIt is the method of interpolating between the data points using quadratic polynomials. For any point, three data points nearby are taken to fit a quadratic polynomial. Extrapolation extends the last quadratic polynomial on each side.\n\nArguments\n\nu: data points.\nt: time points.\nmode: :Forward or :Backward. If :Forward, two data points ahead of the point and one data point behind is taken for interpolation. If :Backward, two data points behind and one ahead is taken for interpolation.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.LagrangeInterpolation","page":"Manual","title":"DataInterpolations.LagrangeInterpolation","text":"LagrangeInterpolation(u, t, n = length(t) - 1; extrapolate = false)\n\nIt is the method of interpolation using Lagrange polynomials of (k-1)th order passing through all the data points where k is the number of data points.\n\nArguments\n\nu: data points.\nt: time points.\nn: order of the polynomial. Currently only (k-1)th order where k is the number of data points.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.AkimaInterpolation","page":"Manual","title":"DataInterpolations.AkimaInterpolation","text":"AkimaInterpolation(u, t; extrapolate = false)\n\nIt is a spline interpolation built from cubic polynomials. It forms a continuously differentiable function. For more details, refer: https://en.wikipedia.org/wiki/Akima_spline. Extrapolation extends the last cubic polynomial on each side.\n\nArguments\n\nu: data points.\nt: time points.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.ConstantInterpolation","page":"Manual","title":"DataInterpolations.ConstantInterpolation","text":"ConstantInterpolation(u, t; dir = :left, extrapolate = false)\n\nIt is the method of interpolating using a constant polynomial. For any point, two adjacent data points are found on either side (left and right). The value at that point depends on dir. If it is :left, then the value at the left point is chosen and if it is :right, the value at the right point is chosen. Extrapolation extends the last constant polynomial at the end points on each side.\n\nArguments\n\nu: data points.\nt: time points.\n\nKeyword Arguments\n\ndir: indicates which value should be used for interpolation (:left or :right).\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.QuadraticSpline","page":"Manual","title":"DataInterpolations.QuadraticSpline","text":"QuadraticSpline(u, t; extrapolate = false)\n\nIt is a spline interpolation using piecewise quadratic polynomials between each pair of data points. Its first derivative is also continuous. Extrapolation extends the last quadratic polynomial on each side.\n\nArguments\n\nu: data points.\nt: time points.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.CubicSpline","page":"Manual","title":"DataInterpolations.CubicSpline","text":"CubicSpline(u, t; extrapolate = false)\n\nIt is a spline interpolation using piecewise cubic polynomials between each pair of data points. Its first and second derivative is also continuous. Second derivative on both ends are zero, which are also called \"natural\" boundary conditions. Extrapolation extends the last cubic polynomial on each side.\n\nArguments\n\nu: data points.\nt: time points.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.BSplineInterpolation","page":"Manual","title":"DataInterpolations.BSplineInterpolation","text":"BSplineInterpolation(u, t, d, pVecType, knotVecType; extrapolate = false)\n\nIt is a curve defined by the linear combination of n basis functions of degree d where n is the number of data points. For more information, refer https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/B-spline/bspline-curve.html. Extrapolation is a constant polynomial of the end points on each side.\n\nArguments\n\nu: data points.\nt: time points.\nd: degree of the piecewise polynomial.\npVecType: symbol to parameters vector, :Uniform for uniform spaced parameters and :ArcLen for parameters generated by chord length method.\nknotVecType: symbol to knot vector, :Uniform for uniform knot vector, :Average for average spaced knot vector.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.BSplineApprox","page":"Manual","title":"DataInterpolations.BSplineApprox","text":"BSplineApprox(u, t, d, h, pVecType, knotVecType; extrapolate = false)\n\nIt is a regression based B-spline. The argument choices are the same as the BSplineInterpolation, with the additional parameter h < length(t) which is the number of control points to use, with smaller h indicating more smoothing. For more information, refer http://www.cad.zju.edu.cn/home/zhx/GM/009/00-bsia.pdf. Extrapolation is a constant polynomial of the end points on each side.\n\nArguments\n\nu: data points.\nt: time points.\nd: degree of the piecewise polynomial.\nh: number of control points to use.\npVecType: symbol to parameters vector, :Uniform for uniform spaced parameters and :ArcLen for parameters generated by chord length method.\nknotVecType: symbol to knot vector, :Uniform for uniform knot vector, :Average for average spaced knot vector.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.CubicHermiteSpline","page":"Manual","title":"DataInterpolations.CubicHermiteSpline","text":"CubicHermiteSpline(du, u, t; extrapolate = false)\n\nIt is a Cubic Hermite interpolation, which is a piece-wise third degree polynomial such that the value and the first derivative are equal to given values in the data points.\n\nArguments\n\ndu: the derivative at the data points.\nu: data points.\nt: time points.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"manual/#DataInterpolations.QuinticHermiteSpline","page":"Manual","title":"DataInterpolations.QuinticHermiteSpline","text":"QuinticHermiteSpline(ddu, du, u, t; extrapolate = false)\n\nIt is a Quintic Hermite interpolation, which is a piece-wise fifth degree polynomial such that the value and the first and second derivative are equal to given values in the data points.\n\nArguments\n\nddu: the second derivative at the data points.\ndu: the derivative at the data points.\nu: data points.\nt: time points.\n\nKeyword Arguments\n\nextrapolate: boolean value to allow extrapolation. Defaults to false.\nsafetycopy: boolean value to make a copy of u and t. Defaults to true.\n\n\n\n\n\n","category":"type"},{"location":"methods/#Interpolation-using-different-methods","page":"Methods","title":"Interpolation using different methods","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"We will use the following data to demonstrate interpolation methods.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"using DataInterpolations, Plots\ngr() # hide\n\n# Dependent variable\nu = [14.7, 11.51, 10.41, 14.95, 12.24, 11.22]\n\n# Independent variable\nt = [0.0, 62.25, 109.66, 162.66, 205.8, 252.3]","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"For each method, we will show how to perform the fit and use the plot recipe to show the fitting curve.","category":"page"},{"location":"methods/#Linear-Interpolation","page":"Methods","title":"Linear Interpolation","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is a linear interpolation between the ends points of the interval of input data points.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = LinearInterpolation(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Quadratic-Interpolation","page":"Methods","title":"Quadratic Interpolation","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This function fits a parabola passing through the two nearest points from the input data point as well as the next-closest point on the right or left, depending on whether the forward- or backward-looking mode is selected (default mode is forward-looking). It is continuous and piecewise differentiable.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = QuadraticInterpolation(u, t) # same as QuadraticInterpolation(u,t,:Forward)\n# alternatively: A = QuadraticInterpolation(u,t,:Backward)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Lagrange-Interpolation","page":"Methods","title":"Lagrange Interpolation","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"It fits a polynomial of degree d (=length(t)-1), and is thus a continuously differentiable function.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = LagrangeInterpolation(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Akima-Interpolation","page":"Methods","title":"Akima Interpolation","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This function fits piecewise cubic polynomials which forms a continuously differentiable function. This differs from Cubic Spline as coefficients are computed using only neighbouring points and hence the fit looks more natural.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = AkimaInterpolation(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Constant-Interpolation","page":"Methods","title":"Constant Interpolation","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This function is constant between data points. By default, it takes the value at the left end of the interval. One can change that behavior by passing the keyword argument dir = :right.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = ConstantInterpolation(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"Or using the right endpoints:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = ConstantInterpolation(u, t, dir = :right)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Quadratic-Spline","page":"Methods","title":"Quadratic Spline","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is the quadratic spline. It is a continuously differentiable interpolation which hits each of the data points exactly. Splines are a local interpolation method, meaning that the curve in a given spot is only affected by the points nearest to it.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = QuadraticSpline(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Cubic-Spline","page":"Methods","title":"Cubic Spline","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is the cubic spline. It is a continuously twice differentiable interpolation which hits each of the data points exactly.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = CubicSpline(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#B-Splines","page":"Methods","title":"B-Splines","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is an interpolating B-spline. B-splines are a global method, meaning that every data point is taken into account for each point of the curve. The interpolating B-spline is the version which hits each of the points. This method is described in more detail here. Let's plot a cubic B-spline (3rd order). Since the data points are not close to uniformly spaced, we will use the :ArcLen and :Average choices:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = BSplineInterpolation(u, t, 3, :ArcLen, :Average)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"The approximating B-spline is a smoothed version of the B-spline. It again is a global method. In this case, we need to give a number of control points length(t)>h and this method fits a B-spline through the control points which is a least square approximation. This has a natural effect of smoothing the data. For example, if we use 4 control points, we get the result:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = BSplineApprox(u, t, 3, 4, :ArcLen, :Average)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Cubic-Hermite-Spline","page":"Methods","title":"Cubic Hermite Spline","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is the cubic (third order) Hermite interpolation. It matches the values and first order derivatives in the data points exactly.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"du = [-0.047, -0.058, 0.054, 0.012, -0.068, 0.0011]\nA = CubicHermiteSpline(du, u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Quintic-Hermite-Spline","page":"Methods","title":"Quintic Hermite Spline","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is the quintic (fifth order) Hermite interpolation. It matches the values and first and second order derivatives in the data points exactly.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"ddu = [0.0, -0.00033, 0.0051, -0.0067, 0.0029, 0.0]\ndu = [-0.047, -0.058, 0.054, 0.012, -0.068, 0.0011]\nA = QuinticHermiteSpline(ddu, du, u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Regularization-Smoothing","page":"Methods","title":"Regularization Smoothing","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"Smoothing by regularization (a.k.a. ridge regression) finds a function hatu that minimizes the objective function:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"Q(hatu) = int_t_1^t_N hatu(t) - u(t)^2 mathrmdt + lambda int_hatt_1^hatt_N hatu^(d)(hatt)^2 mathrmd hatt","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"where (d) denotes derivative order and lambda is the regularization (smoothing) parameter. The integrals are evaluated numerically at the set of t values for the first term and hatt values for the second term (equal to t if not provided). Regularization smoothing is a global method that creates a smooth curve directly. See Stickel (2010) Comput. Chem. Eng. 34:467 for details. The implementation in this package uses cubic splines to interpolate between the smoothed points after they are determined.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"using RegularizationTools\nd = 2\nλ = 1e3\nA = RegularizationSmooth(u, t, d; λ = λ, alg = :fixed)\nû = A.û\n# interpolate using the smoothed values\nN = 200\ntitp = collect(range(minimum(t), maximum(t), length = N))\nuitp = A.(titp)\nlw = 1.5\nscatter(t, u, label = \"data\")\nscatter!(t, û, marker = :square, label = \"smoothed data\")\nplot!(titp, uitp, lw = lw, label = \"smoothed interpolation\")","category":"page"},{"location":"methods/#Dense-Data-Demonstration","page":"Methods","title":"Dense Data Demonstration","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"Some methods are better suited for dense data. Let's generate such data to demonstrate these methods.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"import StableRNGs: StableRNG\nrng = StableRNG(318)\nt = sort(10 .* rand(rng, 100))\nu = sin.(t) .+ 0.5 * randn(rng, 100);","category":"page"},{"location":"methods/#Regularization-Smoothing-2","page":"Methods","title":"Regularization Smoothing","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"Although smoothing by regularization can be used to interpolate sparse data as shown above, it is especially useful for dense as well as scattered data (unequally spaced, unordered, and/or repeat-valued). Generalized cross validation (GCV) or so-called L-curve methods can be used to determine an \"optimal\" value for the smoothing parameter. In this example, we perform smoothing in two ways. In the first, we find smooth values at the original t values and then interpolate. In the second, we perform the smoothing for the interpolant hatt values directly. GCV is used to determine the regularization parameter for both cases.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"d = 4\nA = RegularizationSmooth(u, t, d; alg = :gcv_svd)\nû = A.û\nN = 200\ntitp = collect(range(minimum(t), maximum(t), length = N))\nuitp = A.(titp)\nAm = RegularizationSmooth(u, t, titp, d; alg = :gcv_svd)\nûm = Am.û\nscatter(t, u, label = \"simulated data\", legend = :top)\nscatter!(t, û, marker = (:square, 4), label = \"smoothed data\")\nplot!(titp, uitp, lw = lw, label = \"smoothed interpolation\")\nplot!(titp, ûm, lw = lw, linestyle = :dash, label = \"smoothed, more points\")","category":"page"},{"location":"methods/#Curve-Fits","page":"Methods","title":"Curve Fits","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"A curve fit works with both dense and sparse data. We will demonstrate the curve fit on the dense data since we generated it based on sin(t), so this is the curve we want to fit through it. To do so, let's define a similar function with parameters. Let's choose the form:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"m(t, p) = @. p[1] * sin(p[2] * t) + p[3] * cos(p[4] * t)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"Notice that this is a function on the whole array of t and expects an array for the predicted u out. This choice of m is based on the assumption that our function is of the form p1*sin(p2*t)+p3*cos(p4*t). We want to find the p to match our data. Let's start with the guess of every p being zero, that is p=ones(4). Then we would fit this curve using:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"using Optim\nA = Curvefit(u, t, m, ones(4), LBFGS())\nscatter(t, u, label = \"points\", legend = :bottomright)\nplot!(A)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"We can check what the fitted parameters are via:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A.pmin","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"Notice that it essentially made p3=0 with p1=p2=1, meaning it approximately found sin(t)! But note that the ability to fit is dependent on the initial parameters. For example, with p=zeros(4) as the initial parameters, the fit is not good:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = Curvefit(u, t, m, zeros(4), LBFGS())\nscatter(t, u, label = \"points\", legend = :bottomright)\nplot!(A)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"And the parameters show the issue:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A.pmin","category":"page"},{"location":"#DataInterpolations.jl","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"DataInterpolations.jl is a library for performing interpolations of one-dimensional data. By \"data interpolations\" we mean techniques for interpolating possibly noisy data, and thus some methods are mixtures of regressions with interpolations (i.e. do not hit the data points exactly, smoothing out the lines). This library can be used to fill in intermediate data points in applications like timeseries data.","category":"page"},{"location":"#Installation","page":"DataInterpolations.jl","title":"Installation","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"To install DataInterpolations.jl, use the Julia package manager:","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using Pkg\nPkg.add(\"DataInterpolations\")","category":"page"},{"location":"#Available-Interpolations","page":"DataInterpolations.jl","title":"Available Interpolations","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"In all cases, u an AbstractVector of values and t is an AbstractVector of timepoints corresponding to (u,t) pairs.","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"ConstantInterpolation(u,t) - A piecewise constant interpolation.\nLinearInterpolation(u,t) - A linear interpolation.\nQuadraticInterpolation(u,t) - A quadratic interpolation.\nLagrangeInterpolation(u,t,n) - A Lagrange interpolation of order n.\nQuadraticSpline(u,t) - A quadratic spline interpolation.\nCubicSpline(u,t) - A cubic spline interpolation.\nAkimaInterpolation(u, t) - Akima spline interpolation provides a smoothing effect and is computationally efficient.\nBSplineInterpolation(u,t,d,pVec,knotVec) - An interpolation B-spline. This is a B-spline that hits each of the data points. The argument choices are:\nd - degree of B-spline\npVec - Symbol to Parameters Vector, pVec = :Uniform for uniformly spaced parameters, and pVec = :ArcLen for parameters generated by the chord length method.\nknotVec - Symbol to Knot Vector, knotVec = :Uniform for uniform knot vector, knotVec = :Average for average spaced knot vector.\nBSplineApprox(u,t,d,h,pVec,knotVec) - A regression B-spline which smooths the fitting curve. The argument choices are the same as the BSplineInterpolation, with the additional parameter h<length(t) which is the number of control points to use, with smaller h indicating more smoothing.\nCubicHermiteSpline(du, u, t) - A third order Hermite interpolation, which matches the values and first (du) order derivatives in the data points exactly.\nQuinticHermiteSpline(ddu, du, u, t) - a fifth order Hermite interpolation, which matches the values and first (du) and second (ddu) order derivatives in the data points exactly.","category":"page"},{"location":"#Extension-Methods","page":"DataInterpolations.jl","title":"Extension Methods","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"The following methods require extra dependencies and will be loaded as package extensions.","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"Curvefit(u,t,m,p,alg) - An interpolation which is done by fitting a user-given functional form m(t,p) where p is the vector of parameters. The user's input p is an initial value for a least-squares fitting, alg is the algorithm choice to use to optimize the cost function (sum of squared deviations) via Optim.jl and optimal ps are used in the interpolation. Requires using Optim.\nRegularizationSmooth(u,t,d;λ,alg) - A regularization algorithm (ridge regression) which is done by minimizing an objective function (l2 loss + derivatives of order d) integrated in the time span. It is a global method which creates a smooth curve. Requires using RegularizationTools.","category":"page"},{"location":"#Plotting","page":"DataInterpolations.jl","title":"Plotting","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"DataInterpolations.jl is tied into the Plots.jl ecosystem, by way of RecipesBase. Any interpolation can be plotted using the plot command (or any other), since they have type recipes associated with them.","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"For convenience, and to allow keyword arguments to propagate properly, DataInterpolations.jl also defines several series types, corresponding to different interpolations.","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"The series types defined are:","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":":linear_interp\n:quadratic_interp\n:lagrange_interp\n:quadratic_spline\n:cubic_spline","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"By and large, these accept the same keywords as their function counterparts.","category":"page"},{"location":"#Contributing","page":"DataInterpolations.jl","title":"Contributing","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"Please refer to the SciML ColPrac: Contributor's Guide on Collaborative Practices for Community Packages for guidance on PRs, issues, and other matters relating to contributing to SciML.\nSee the SciML Style Guide for common coding practices and other style decisions.\nThere are a few community forums:\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Slack\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Zulip\nOn the Julia Discourse forums\nSee also SciML Community page","category":"page"},{"location":"#Reproducibility","page":"DataInterpolations.jl","title":"Reproducibility","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"<details><summary>The documentation of this SciML package was built using these direct dependencies,</summary>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using Pkg # hide\nPkg.status() # hide","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"</details>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"<details><summary>and using this machine and Julia version.</summary>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using InteractiveUtils # hide\nversioninfo() # hide","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"</details>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"<details><summary>A more complete overview of all dependencies and their versions is also provided.</summary>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using Pkg # hide\nPkg.status(; mode = PKGMODE_MANIFEST) # hide","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"</details>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using TOML\nusing Markdown\nversion = TOML.parse(read(\"../../Project.toml\", String))[\"version\"]\nname = TOML.parse(read(\"../../Project.toml\", String))[\"name\"]\nlink_manifest = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n                \"/assets/Manifest.toml\"\nlink_project = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n               \"/assets/Project.toml\"\nMarkdown.parse(\"\"\"You can also download the\n[manifest]($link_manifest)\nfile and the\n[project]($link_project)\nfile.\n\"\"\")","category":"page"}]
}
