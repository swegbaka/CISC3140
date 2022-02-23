cd data_lab1
awk -F","  'NR>1{sum=0;old=0;new=0; for(g=8;g<=NF;g++)sum+=$g
                    printf "%-15s%-15s%-15s%-15s%-15s%-15s\n", $old+NR, $7,$4,$5,$6,"Total score:"sum "\tNew Ranking:" new+NR}' data.csv | sort -t':' -k2 -r -n 
