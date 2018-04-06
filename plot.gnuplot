set datafile separator ","
set terminal png
unset key

list = system('ls -1 ./data/*.csv')

do for [file in list] {   
    print file
    id = system('basename -s .csv '.file)
    unset ytics
    unset xtics
    unset border
    set out './static/'.id.'.png'
    plot file using 1 with lines
}