var documenterSearchIndex = {"docs":
[{"location":"interface/#Interface-for-using-the-Interpolations-object","page":"Interface","title":"Interface for using the Interpolations object","text":"","category":"section"},{"location":"interface/","page":"Interface","title":"Interface","text":"We will again use the same data as the previous tutorial to demonstrate how to use the Interpolations object for computing interpolated values at any time point, its derivatives and integrals.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"using DataInterpolations\n\n# Dependent variable\nu = [14.7, 11.51, 10.41, 14.95, 12.24, 11.22]\n\n# Independent variable\nt = [0.0, 62.25, 109.66, 162.66, 205.8, 252.3]","category":"page"},{"location":"interface/#Interpolated-values","page":"Interface","title":"Interpolated values","text":"","category":"section"},{"location":"interface/","page":"Interface","title":"Interface","text":"All Interpolation methods return an object from which we can compute the value of the dependent variable at any time point.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"We will use CubicSpline method for demonstration but the API is same for all the methods.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"A = CubicSpline(u, t)\n\n# For interpolation do, A(t)\nA(100.0)","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"note: Note\nThe values computed beyond the range of the time points provided during interpolation will not be reliable as these methods only perform well within the range and the first/last piece polynomial fit is extrapolated on either sides which might not reflect the true nature of the data.","category":"page"},{"location":"interface/#Derivatives","page":"Interface","title":"Derivatives","text":"","category":"section"},{"location":"interface/","page":"Interface","title":"Interface","text":"Derivatives of the interpolated curves can also be computed at any point for all the methods.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"We will continue with the above example, but the API is same for all the methods.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"# derivative(A, t)\nDataInterpolations.derivative(A, 1.0)","category":"page"},{"location":"interface/#Integrals","page":"Interface","title":"Integrals","text":"","category":"section"},{"location":"interface/","page":"Interface","title":"Interface","text":"Integrals of the interpolated curves can also be computed easily.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"Currently, this is implemented only for a few methods - ConstantInterpolation, LinearInterpolation, QuadraticInterpolation, QuadraticSpline and CubicSpline.","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"To compute the integrals from the start of time points provided during interpolation to any point, we can do:","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"# integral(A, t)\nDataInterpolations.integral(A, 5.0)","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"If we want to compute integrals between two points, we can do:","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"# integral(A, t1, t2)\nDataInterpolations.integral(A, 1.0, 5.0)","category":"page"},{"location":"interface/","page":"Interface","title":"Interface","text":"note: Note\nIf the times provided in the integral goes beyond the range of the time points provided during interpolation, it uses extrapolation methods to compute the values and hence the integral can be misrepsentative and might not reflect the true nature of the data.","category":"page"},{"location":"methods/#Interpolation-using-different-methods","page":"Methods","title":"Interpolation using different methods","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"We will use the following data to demonstrate interpolation methods.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"using DataInterpolations, Plots\ngr() # hide\n\n# Dependent variable\nu = [14.7, 11.51, 10.41, 14.95, 12.24, 11.22]\n\n# Independent variable\nt = [0.0, 62.25, 109.66, 162.66, 205.8, 252.3]","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"For each method, we will show how to perform the fit and use the plot recipe to show the fitting curve.","category":"page"},{"location":"methods/#Linear-Interpolation","page":"Methods","title":"Linear Interpolation","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is a linear interpolation between ends points of interval of input data point.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = LinearInterpolation(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Quadratic-Interpolation","page":"Methods","title":"Quadratic Interpolation","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This function fits a parabola passing through the two nearest points from the input data point as well as the next-closest point in the right or the left, depending on whether the forward- or backward-looking mode is selected (default mode is forward-looking). It is continuous and piecewise differentiable.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = QuadraticInterpolation(u, t) # same as QuadraticInterpolation(u,t,:Forward)\n# alternatively: A = QuadraticInterpolation(u,t,:Backward)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Lagrange-Interpolation","page":"Methods","title":"Lagrange Interpolation","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"It fits polynomial of degree d (=length(t)-1), and is thuse a continuously differentiable function.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = LagrangeInterpolation(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Constant-Interpolation","page":"Methods","title":"Constant Interpolation","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This function is constant between data points. By default it takes value at left end of the interval. One can change that behavior by passing the keyword argument dir = :right.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = ConstantInterpolation(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"Or using the right endpoints:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = ConstantInterpolation(u, t, dir = :right)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Quadratic-Spline","page":"Methods","title":"Quadratic Spline","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is the quadratic spline. It is a continuously differentiable interpolation which hits each of the data points exactly. Splines are a local interpolation method, meaning that the curve in a given spot is only affected by the points nearest to it.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = QuadraticSpline(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Cubic-Spline","page":"Methods","title":"Cubic Spline","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is the cubic spline. It is a continuously twice differentiable interpolation which hits each of the data points exactly.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = CubicSpline(u, t)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#B-Splines","page":"Methods","title":"B-Splines","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"This is an interpolating B-spline. B-splines are a global method, meaning that every data point is taken into account for each point of the curve. The interpolating B-spline is the version which hits each of the points. This method is described in more detail here. Let's plot a cubic B-spline (3rd order). Since the data points are not close to uniformly spaced, we will use the :ArcLen and :Average choices:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = BSplineInterpolation(u, t, 3, :ArcLen, :Average)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"The approximating B-spline is a smoothed version of the B-spline. It again is a global method. In this case, we need to give a number of control points length(t)>h and this method fits a B-spline through the control points which is a least square approximation. This has a natural effect of smoothing the data. For example, if we use 4 control points, we get the result:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = BSplineApprox(u, t, 3, 4, :ArcLen, :Average)\nscatter(t, u, label = \"input data\")\nplot!(A)","category":"page"},{"location":"methods/#Regularization-Smoothing","page":"Methods","title":"Regularization Smoothing","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"Smoothing by regularization (a.k.a. ridge regression) finds a function hatu that minimizes the objective function:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"Q(hatu) = int_t_1^t_N hatu(t) - u(t)^2 mathrmdt + lambda int_hatt_1^hatt_N hatu^(d)(hatt)^2 mathrmd hatt","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"where (d) denotes derivative order and lambda is the regularization (smoothing) parameter. The integrals are evaluated numerically at the set of t values for the first term and hatt values for the second term (equal to t if not provided). Regularization smoothing is a global method and creates a smooth curve directly. See Stickel (2010) Comput. Chem. Eng. 34:467 for details. The implementation in this package uses cubic splines to interpolate between the smoothed points after they are determined.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"using RegularizationTools\nd = 2\nλ = 1e3\nA = RegularizationSmooth(u, t, d; λ = λ, alg = :fixed)\nû = A.û\n# interpolate using the smoothed values\nN = 200\ntitp = collect(range(minimum(t), maximum(t), length = N))\nuitp = A.(titp)\nlw = 1.5\nscatter(t, u, label = \"data\")\nscatter!(t, û, marker = :square, label = \"smoothed data\")\nplot!(titp, uitp, lw = lw, label = \"smoothed interpolation\")","category":"page"},{"location":"methods/#Dense-Data-Demonstration","page":"Methods","title":"Dense Data Demonstration","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"Some methods are better suited for dense data. Let's generate such data to demonstrate these methods.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"import StableRNGs: StableRNG\nrng = StableRNG(318)\nt = sort(10 .* rand(rng, 100))\nu = sin.(t) .+ 0.5 * randn(rng, 100);","category":"page"},{"location":"methods/#Regularization-Smoothing-2","page":"Methods","title":"Regularization Smoothing","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"Although smoothing by regularization can be used to interpolate sparse data as shown above, it is especially useful for dense and also scattered data (unequally spaced, unordered, and/or repeat-valued). Generalized cross validation (GCV) or so-called L-curve methods can be used to determine an \"optimal\" value for the smoothing parameter. In this example, we perform smoothing in two ways. In the first, we find smooth values at the original t values and then interpolate. In the second, we perform the smoothing for the interpolatant hatt values directly. GCV is used to determine the regularization parameter for both cases.","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"d = 4\nA = RegularizationSmooth(u, t, d; alg = :gcv_svd)\nû = A.û\nN = 200\ntitp = collect(range(minimum(t), maximum(t), length = N))\nuitp = A.(titp)\nAm = RegularizationSmooth(u, t, titp, d; alg = :gcv_svd)\nûm = Am.û\nscatter(t, u, label = \"simulated data\", legend = :top)\nscatter!(t, û, marker = (:square, 4), label = \"smoothed data\")\nplot!(titp, uitp, lw = lw, label = \"smoothed interpolation\")\nplot!(titp, ûm, lw = lw, linestyle = :dash, label = \"smoothed, more points\")","category":"page"},{"location":"methods/#Curve-Fits","page":"Methods","title":"Curve Fits","text":"","category":"section"},{"location":"methods/","page":"Methods","title":"Methods","text":"A curve fit works with both dense and sparse data. We will demonstrate the curve fit on the dense data since we generated it based on sin(t), so this is the curve we want to fit through it. Do do so, let's define a similar function with parameters. Let's choose the form:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"m(t, p) = @. p[1] * sin(p[2] * t) + p[3] * cos(p[4] * t)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"Notice that this is a function on the whole array of t and expects an array for the predicted u out. This choice of m is the assumption that our function is of the form p1*sin(p2*t)+p3*cos(p4*t). We want to find the p to match our data. Let's start with the guess of every p being zero, that is p=ones(4). Then we would fit this curve using:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"using Optim\nA = Curvefit(u, t, m, ones(4), LBFGS())\nscatter(t, u, label = \"points\", legend = :bottomright)\nplot!(A)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"We can check what the fitted parameters are via:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A.pmin","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"Notice that it essentially made p3=0 with p1=p2=1, meaning it approximately found sin(t)! But note that the ability to fit is dependent on the initial parameters. For example, with p=zeros(4) as the initial parameters the fit is not good:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A = Curvefit(u, t, m, zeros(4), LBFGS())\nscatter(t, u, label = \"points\", legend = :bottomright)\nplot!(A)","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"And the parameters show the issue:","category":"page"},{"location":"methods/","page":"Methods","title":"Methods","text":"A.pmin","category":"page"},{"location":"#DataInterpolations.jl","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"DataInterpolations.jl is a library for performing interpolations of one-dimensional data. By \"data interpolations\" we mean techniques for interpolating possibly noisy data, and thus some methods are mixtures of regressions with interpolations (i.e. do not hit the data points exactly, smoothing out the lines). This library can be used to fill in intermediate data points in applications like timeseries data.","category":"page"},{"location":"#Installation","page":"DataInterpolations.jl","title":"Installation","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"To install DataInterpolations.jl, use the Julia package manager:","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using Pkg\nPkg.add(\"DataInterpolations\")","category":"page"},{"location":"#Available-Interpolations","page":"DataInterpolations.jl","title":"Available Interpolations","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"In all cases, u an AbstractVector of values and t is an AbstractVector of timepoints corresponding to (u,t) pairs.","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"ConstantInterpolation(u,t) - A piecewise constant interpolation.\nLinearInterpolation(u,t) - A linear interpolation.\nQuadraticInterpolation(u,t) - A quadratic interpolation.\nLagrangeInterpolation(u,t,n) - A Lagrange interpolation of order n.\nQuadraticSpline(u,t) - A quadratic spline interpolation.\nCubicSpline(u,t) - A cubic spline interpolation.\nAkimaInterpolation(u, t) - Akima spline interpolation provides a smoothing effect and is computationally efficient.\nBSplineInterpolation(u,t,d,pVec,knotVec) - An interpolation B-spline. This is a B-spline which hits each of the data points. The argument choices are:\nd - degree of B-spline\npVec - Symbol to Parameters Vector, pVec = :Uniform for uniform spaced parameters and pVec = :ArcLen for parameters generated by chord length method.\nknotVec - Symbol to Knot Vector, knotVec = :Uniform for uniform knot vector, knotVec = :Average for average spaced knot vector.\nBSplineApprox(u,t,d,h,pVec,knotVec) - A regression B-spline which smooths the fitting curve. The argument choices are the same as the BSplineInterpolation, with the additional parameter h<length(t) which is the number of control points to use, with smaller h indicating more smoothing.","category":"page"},{"location":"#Extension-Methods","page":"DataInterpolations.jl","title":"Extension Methods","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"The follow methods require extra dependencies and will be loaded as package extensions.","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"Curvefit(u,t,m,p,alg) - An interpolation which is done by fitting a user-given functional form m(t,p) where p is the vector of parameters. The user's input p is a an initial value for a least-square fitting, alg is the algorithm choice to use for optimize the cost function (sum of squared deviations) via Optim.jl and optimal ps are used in the interpolation. Requires using Optim.\nRegularizationSmooth(u,t,d;λ,alg) - A regularization algorithm (ridge regression) which is done by minimizing an objective function (l2 loss + derivatives of order d) integrated in the time span. It is a global method and creates a smooth curve. Requires using RegularizationTools.","category":"page"},{"location":"#Plotting","page":"DataInterpolations.jl","title":"Plotting","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"DataInterpolations.jl is tied into the Plots.jl ecosystem, by way of RecipesBase. Any interpolation can be plotted using the plot command (or any other), since they have type recipes associated with them.","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"For convenience, and to allow keyword arguments to propagate properly, DataInterpolations.jl also defines several series types, corresponding to different interpolations.","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"The series types defined are:","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":":linear_interp\n:quadratic_interp\n:lagrange_interp\n:quadratic_spline\n:cubic_spline","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"By and large, these accept the same keywords as their function counterparts.","category":"page"},{"location":"#Contributing","page":"DataInterpolations.jl","title":"Contributing","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"Please refer to the SciML ColPrac: Contributor's Guide on Collaborative Practices for Community Packages for guidance on PRs, issues, and other matters relating to contributing to SciML.\nSee the SciML Style Guide for common coding practices and other style decisions.\nThere are a few community forums:\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Slack\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Zulip\nOn the Julia Discourse forums\nSee also SciML Community page","category":"page"},{"location":"#Reproducibility","page":"DataInterpolations.jl","title":"Reproducibility","text":"","category":"section"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"<details><summary>The documentation of this SciML package was built using these direct dependencies,</summary>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using Pkg # hide\nPkg.status() # hide","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"</details>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"<details><summary>and using this machine and Julia version.</summary>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using InteractiveUtils # hide\nversioninfo() # hide","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"</details>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"<details><summary>A more complete overview of all dependencies and their versions is also provided.</summary>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using Pkg # hide\nPkg.status(; mode = PKGMODE_MANIFEST) # hide","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"</details>","category":"page"},{"location":"","page":"DataInterpolations.jl","title":"DataInterpolations.jl","text":"using TOML\nusing Markdown\nversion = TOML.parse(read(\"../../Project.toml\", String))[\"version\"]\nname = TOML.parse(read(\"../../Project.toml\", String))[\"name\"]\nlink_manifest = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n                \"/assets/Manifest.toml\"\nlink_project = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n               \"/assets/Project.toml\"\nMarkdown.parse(\"\"\"You can also download the\n[manifest]($link_manifest)\nfile and the\n[project]($link_project)\nfile.\n\"\"\")","category":"page"}]
}
