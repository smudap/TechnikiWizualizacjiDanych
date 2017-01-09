save_stdout <- function(x){
  paste(capture.output(x), collapse = '\n')
}

save_nplot_to_file <- function(name, plot) 
{
  d = save_stdout(plot$print('inline', include_assets = TRUE, cdn = TRUE))
  write(d, file = name,
        append = FALSE, sep = " ")
}

save_nplot_with_custom_scripts_to_file <- function(name, plot, title = "") 
{
  x = "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.5/nv.d3.min.css'>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.3/jquery.min.js' charset='utf-8'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.2/d3.min.js' charset='utf-8'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.5/nv.d3.min.js' charset='utf-8'></script>
";
  write(x, file = name,
        append = FALSE, sep = " ")
  
  if (!missing(title) && title != "")
  {
    write(paste(c("<h1>", title, "</h1>"), sep=""), file = name,
          append = TRUE, sep = " ")
  }
  
  d = save_stdout(plot$print('inline', include_assets = FALSE, cdn = FALSE))
  write(d, file = name,
        append = TRUE, sep = " ")
}