require("dotenv").config();
const AWS = require('aws-sdk');
const fs = require('fs');

// Set the region and access keys
AWS.config.update({
    region: 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();
let array = [
    {
        "const_id": 101
    },
    {
        "const_id": 102
    },
    {
        "const_id": 103
    },
    {
        "const_id": 104
    },
    {
        "const_id": 105
    },
    {
        "const_id": 106
    },
    {
        "const_id": 201
    },
    {
        "const_id": 202
    },
    {
        "const_id": 203
    },
    {
        "const_id": 204
    },
    {
        "const_id": 301
    },
    {
        "const_id": 302
    },
    {
        "const_id": 303
    },
    {
        "const_id": 304
    },
    {
        "const_id": 305
    },
    {
        "const_id": 306
    },
    {
        "const_id": 307
    },
    {
        "const_id": 308
    },
    {
        "const_id": 309
    },
    {
        "const_id": 310
    },
    {
        "const_id": 311
    },
    {
        "const_id": 312
    },
    {
        "const_id": 313
    },
    {
        "const_id": 401
    },
    {
        "const_id": 501
    },
    {
        "const_id": 502
    },
    {
        "const_id": 503
    },
    {
        "const_id": 504
    },
    {
        "const_id": 505
    },
    {
        "const_id": 601
    },
    {
        "const_id": 602
    },
    {
        "const_id": 603
    },
    {
        "const_id": 604
    },
    {
        "const_id": 605
    },
    {
        "const_id": 606
    },
    {
        "const_id": 607
    },
    {
        "const_id": 608
    },
    {
        "const_id": 609
    },
    {
        "const_id": 610
    },
    {
        "const_id": 701
    },
    {
        "const_id": 702
    },
    {
        "const_id": 703
    },
    {
        "const_id": 704
    },
    {
        "const_id": 705
    },
    {
        "const_id": 706
    },
    {
        "const_id": 707
    },
    {
        "const_id": 801
    },
    {
        "const_id": 802
    },
    {
        "const_id": 803
    },
    {
        "const_id": 804
    },
    {
        "const_id": 805
    },
    {
        "const_id": 806
    },
    {
        "const_id": 807
    },
    {
        "const_id": 808
    },
    {
        "const_id": 809
    },
    {
        "const_id": 810
    },
    {
        "const_id": 811
    },
    {
        "const_id": 812
    },
    {
        "const_id": 813
    },
    {
        "const_id": 814
    },
    {
        "const_id": 815
    },
    {
        "const_id": 816
    },
    {
        "const_id": 817
    },
    {
        "const_id": 818
    },
    {
        "const_id": 819
    },
    {
        "const_id": 820
    },
    {
        "const_id": 821
    },
    {
        "const_id": 822
    },
    {
        "const_id": 823
    },
    {
        "const_id": 824
    },
    {
        "const_id": 825
    },
    {
        "const_id": 901
    },
    {
        "const_id": 902
    },
    {
        "const_id": 903
    },
    {
        "const_id": 904
    },
    {
        "const_id": 905
    },
    {
        "const_id": 906
    },
    {
        "const_id": 907
    },
    {
        "const_id": 908
    },
    {
        "const_id": 909
    },
    {
        "const_id": 910
    },
    {
        "const_id": 911
    },
    {
        "const_id": 912
    },
    {
        "const_id": 913
    },
    {
        "const_id": 914
    },
    {
        "const_id": 915
    },
    {
        "const_id": 916
    },
    {
        "const_id": 917
    },
    {
        "const_id": 918
    },
    {
        "const_id": 919
    },
    {
        "const_id": 920
    },
    {
        "const_id": 921
    },
    {
        "const_id": 922
    },
    {
        "const_id": 923
    },
    {
        "const_id": 924
    },
    {
        "const_id": 925
    },
    {
        "const_id": 926
    },
    {
        "const_id": 927
    },
    {
        "const_id": 928
    },
    {
        "const_id": 929
    },
    {
        "const_id": 930
    },
    {
        "const_id": 931
    },
    {
        "const_id": 932
    },
    {
        "const_id": 933
    },
    {
        "const_id": 934
    },
    {
        "const_id": 935
    },
    {
        "const_id": 936
    },
    {
        "const_id": 937
    },
    {
        "const_id": 938
    },
    {
        "const_id": 939
    },
    {
        "const_id": 940
    },
    {
        "const_id": 941
    },
    {
        "const_id": 942
    },
    {
        "const_id": 943
    },
    {
        "const_id": 944
    },
    {
        "const_id": 945
    },
    {
        "const_id": 946
    },
    {
        "const_id": 947
    },
    {
        "const_id": 948
    },
    {
        "const_id": 949
    },
    {
        "const_id": 950
    },
    {
        "const_id": 951
    },
    {
        "const_id": 952
    },
    {
        "const_id": 953
    },
    {
        "const_id": 954
    },
    {
        "const_id": 955
    },
    {
        "const_id": 956
    },
    {
        "const_id": 957
    },
    {
        "const_id": 958
    },
    {
        "const_id": 959
    },
    {
        "const_id": 960
    },
    {
        "const_id": 961
    },
    {
        "const_id": 962
    },
    {
        "const_id": 963
    },
    {
        "const_id": 964
    },
    {
        "const_id": 965
    },
    {
        "const_id": 966
    },
    {
        "const_id": 967
    },
    {
        "const_id": 968
    },
    {
        "const_id": 969
    },
    {
        "const_id": 970
    },
    {
        "const_id": 971
    },
    {
        "const_id": 972
    },
    {
        "const_id": 973
    },
    {
        "const_id": 974
    },
    {
        "const_id": 975
    },
    {
        "const_id": 976
    },
    {
        "const_id": 977
    },
    {
        "const_id": 978
    },
    {
        "const_id": 979
    },
    {
        "const_id": 980
    },
    {
        "const_id": 1001
    },
    {
        "const_id": 1002
    },
    {
        "const_id": 1003
    },
    {
        "const_id": 1004
    },
    {
        "const_id": 1005
    },
    {
        "const_id": 1006
    },
    {
        "const_id": 1007
    },
    {
        "const_id": 1008
    },
    {
        "const_id": 1009
    },
    {
        "const_id": 1010
    },
    {
        "const_id": 1011
    },
    {
        "const_id": 1012
    },
    {
        "const_id": 1013
    },
    {
        "const_id": 1014
    },
    {
        "const_id": 1015
    },
    {
        "const_id": 1016
    },
    {
        "const_id": 1017
    },
    {
        "const_id": 1018
    },
    {
        "const_id": 1019
    },
    {
        "const_id": 1020
    },
    {
        "const_id": 1021
    },
    {
        "const_id": 1022
    },
    {
        "const_id": 1023
    },
    {
        "const_id": 1024
    },
    {
        "const_id": 1025
    },
    {
        "const_id": 1026
    },
    {
        "const_id": 1027
    },
    {
        "const_id": 1028
    },
    {
        "const_id": 1029
    },
    {
        "const_id": 1030
    },
    {
        "const_id": 1031
    },
    {
        "const_id": 1032
    },
    {
        "const_id": 1033
    },
    {
        "const_id": 1034
    },
    {
        "const_id": 1035
    },
    {
        "const_id": 1036
    },
    {
        "const_id": 1037
    },
    {
        "const_id": 1038
    },
    {
        "const_id": 1039
    },
    {
        "const_id": 1040
    },
    {
        "const_id": 1101
    },
    {
        "const_id": 1201
    },
    {
        "const_id": 1202
    },
    {
        "const_id": 1301
    },
    {
        "const_id": 1401
    },
    {
        "const_id": 1402
    },
    {
        "const_id": 1501
    },
    {
        "const_id": 1601
    },
    {
        "const_id": 1602
    },
    {
        "const_id": 1701
    },
    {
        "const_id": 1702
    },
    {
        "const_id": 1801
    },
    {
        "const_id": 1802
    },
    {
        "const_id": 1803
    },
    {
        "const_id": 1804
    },
    {
        "const_id": 1805
    },
    {
        "const_id": 1806
    },
    {
        "const_id": 1807
    },
    {
        "const_id": 1808
    },
    {
        "const_id": 1809
    },
    {
        "const_id": 1810
    },
    {
        "const_id": 1811
    },
    {
        "const_id": 1812
    },
    {
        "const_id": 1813
    },
    {
        "const_id": 1814
    },
    {
        "const_id": 1901
    },
    {
        "const_id": 1902
    },
    {
        "const_id": 1903
    },
    {
        "const_id": 1904
    },
    {
        "const_id": 1905
    },
    {
        "const_id": 1906
    },
    {
        "const_id": 1907
    },
    {
        "const_id": 1908
    },
    {
        "const_id": 1909
    },
    {
        "const_id": 1910
    },
    {
        "const_id": 1911
    },
    {
        "const_id": 1912
    },
    {
        "const_id": 1913
    },
    {
        "const_id": 1914
    },
    {
        "const_id": 1915
    },
    {
        "const_id": 1916
    },
    {
        "const_id": 1917
    },
    {
        "const_id": 1918
    },
    {
        "const_id": 1919
    },
    {
        "const_id": 1920
    },
    {
        "const_id": 1921
    },
    {
        "const_id": 1922
    },
    {
        "const_id": 1923
    },
    {
        "const_id": 1924
    },
    {
        "const_id": 1925
    },
    {
        "const_id": 1926
    },
    {
        "const_id": 1927
    },
    {
        "const_id": 1928
    },
    {
        "const_id": 1929
    },
    {
        "const_id": 1930
    },
    {
        "const_id": 1931
    },
    {
        "const_id": 1932
    },
    {
        "const_id": 1933
    },
    {
        "const_id": 1934
    },
    {
        "const_id": 1935
    },
    {
        "const_id": 1936
    },
    {
        "const_id": 1937
    },
    {
        "const_id": 1938
    },
    {
        "const_id": 1939
    },
    {
        "const_id": 1940
    },
    {
        "const_id": 1941
    },
    {
        "const_id": 1942
    },
    {
        "const_id": 2001
    },
    {
        "const_id": 2002
    },
    {
        "const_id": 2003
    },
    {
        "const_id": 2004
    },
    {
        "const_id": 2005
    },
    {
        "const_id": 2006
    },
    {
        "const_id": 2007
    },
    {
        "const_id": 2008
    },
    {
        "const_id": 2009
    },
    {
        "const_id": 2010
    },
    {
        "const_id": 2011
    },
    {
        "const_id": 2012
    },
    {
        "const_id": 2013
    },
    {
        "const_id": 2014
    },
    {
        "const_id": 2101
    },
    {
        "const_id": 2102
    },
    {
        "const_id": 2103
    },
    {
        "const_id": 2104
    },
    {
        "const_id": 2105
    },
    {
        "const_id": 2106
    },
    {
        "const_id": 2107
    },
    {
        "const_id": 2108
    },
    {
        "const_id": 2109
    },
    {
        "const_id": 2110
    },
    {
        "const_id": 2111
    },
    {
        "const_id": 2112
    },
    {
        "const_id": 2113
    },
    {
        "const_id": 2114
    },
    {
        "const_id": 2115
    },
    {
        "const_id": 2116
    },
    {
        "const_id": 2117
    },
    {
        "const_id": 2118
    },
    {
        "const_id": 2119
    },
    {
        "const_id": 2120
    },
    {
        "const_id": 2121
    },
    {
        "const_id": 2201
    },
    {
        "const_id": 2202
    },
    {
        "const_id": 2203
    },
    {
        "const_id": 2204
    },
    {
        "const_id": 2205
    },
    {
        "const_id": 2206
    },
    {
        "const_id": 2207
    },
    {
        "const_id": 2208
    },
    {
        "const_id": 2209
    },
    {
        "const_id": 2210
    },
    {
        "const_id": 2211
    },
    {
        "const_id": 2301
    },
    {
        "const_id": 2302
    },
    {
        "const_id": 2303
    },
    {
        "const_id": 2304
    },
    {
        "const_id": 2305
    },
    {
        "const_id": 2306
    },
    {
        "const_id": 2307
    },
    {
        "const_id": 2308
    },
    {
        "const_id": 2309
    },
    {
        "const_id": 2310
    },
    {
        "const_id": 2311
    },
    {
        "const_id": 2312
    },
    {
        "const_id": 2313
    },
    {
        "const_id": 2314
    },
    {
        "const_id": 2315
    },
    {
        "const_id": 2316
    },
    {
        "const_id": 2317
    },
    {
        "const_id": 2318
    },
    {
        "const_id": 2319
    },
    {
        "const_id": 2320
    },
    {
        "const_id": 2321
    },
    {
        "const_id": 2322
    },
    {
        "const_id": 2323
    },
    {
        "const_id": 2324
    },
    {
        "const_id": 2325
    },
    {
        "const_id": 2326
    },
    {
        "const_id": 2327
    },
    {
        "const_id": 2328
    },
    {
        "const_id": 2329
    },
    {
        "const_id": 2401
    },
    {
        "const_id": 2402
    },
    {
        "const_id": 2403
    },
    {
        "const_id": 2404
    },
    {
        "const_id": 2405
    },
    {
        "const_id": 2406
    },
    {
        "const_id": 2407
    },
    {
        "const_id": 2408
    },
    {
        "const_id": 2409
    },
    {
        "const_id": 2410
    },
    {
        "const_id": 2411
    },
    {
        "const_id": 2412
    },
    {
        "const_id": 2413
    },
    {
        "const_id": 2414
    },
    {
        "const_id": 2415
    },
    {
        "const_id": 2416
    },
    {
        "const_id": 2417
    },
    {
        "const_id": 2418
    },
    {
        "const_id": 2419
    },
    {
        "const_id": 2420
    },
    {
        "const_id": 2421
    },
    {
        "const_id": 2422
    },
    {
        "const_id": 2423
    },
    {
        "const_id": 2424
    },
    {
        "const_id": 2425
    },
    {
        "const_id": 2426
    },
    {
        "const_id": 2501
    },
    {
        "const_id": 2601
    },
    {
        "const_id": 2701
    },
    {
        "const_id": 2702
    },
    {
        "const_id": 2703
    },
    {
        "const_id": 2704
    },
    {
        "const_id": 2705
    },
    {
        "const_id": 2706
    },
    {
        "const_id": 2707
    },
    {
        "const_id": 2708
    },
    {
        "const_id": 2709
    },
    {
        "const_id": 2710
    },
    {
        "const_id": 2711
    },
    {
        "const_id": 2712
    },
    {
        "const_id": 2713
    },
    {
        "const_id": 2714
    },
    {
        "const_id": 2715
    },
    {
        "const_id": 2716
    },
    {
        "const_id": 2717
    },
    {
        "const_id": 2718
    },
    {
        "const_id": 2719
    },
    {
        "const_id": 2720
    },
    {
        "const_id": 2721
    },
    {
        "const_id": 2722
    },
    {
        "const_id": 2723
    },
    {
        "const_id": 2724
    },
    {
        "const_id": 2725
    },
    {
        "const_id": 2726
    },
    {
        "const_id": 2727
    },
    {
        "const_id": 2728
    },
    {
        "const_id": 2729
    },
    {
        "const_id": 2730
    },
    {
        "const_id": 2731
    },
    {
        "const_id": 2732
    },
    {
        "const_id": 2733
    },
    {
        "const_id": 2734
    },
    {
        "const_id": 2735
    },
    {
        "const_id": 2736
    },
    {
        "const_id": 2737
    },
    {
        "const_id": 2738
    },
    {
        "const_id": 2739
    },
    {
        "const_id": 2740
    },
    {
        "const_id": 2741
    },
    {
        "const_id": 2742
    },
    {
        "const_id": 2743
    },
    {
        "const_id": 2744
    },
    {
        "const_id": 2745
    },
    {
        "const_id": 2746
    },
    {
        "const_id": 2747
    },
    {
        "const_id": 2748
    },
    {
        "const_id": 2801
    },
    {
        "const_id": 2802
    },
    {
        "const_id": 2803
    },
    {
        "const_id": 2804
    },
    {
        "const_id": 2805
    },
    {
        "const_id": 2806
    },
    {
        "const_id": 2807
    },
    {
        "const_id": 2808
    },
    {
        "const_id": 2809
    },
    {
        "const_id": 2810
    },
    {
        "const_id": 2811
    },
    {
        "const_id": 2812
    },
    {
        "const_id": 2813
    },
    {
        "const_id": 2814
    },
    {
        "const_id": 2815
    },
    {
        "const_id": 2816
    },
    {
        "const_id": 2817
    },
    {
        "const_id": 2818
    },
    {
        "const_id": 2819
    },
    {
        "const_id": 2820
    },
    {
        "const_id": 2821
    },
    {
        "const_id": 2822
    },
    {
        "const_id": 2823
    },
    {
        "const_id": 2824
    },
    {
        "const_id": 2825
    },
    {
        "const_id": 2826
    },
    {
        "const_id": 2827
    },
    {
        "const_id": 2828
    },
    {
        "const_id": 2829
    },
    {
        "const_id": 2830
    },
    {
        "const_id": 2831
    },
    {
        "const_id": 2832
    },
    {
        "const_id": 2833
    },
    {
        "const_id": 2834
    },
    {
        "const_id": 2835
    },
    {
        "const_id": 2836
    },
    {
        "const_id": 2837
    },
    {
        "const_id": 2838
    },
    {
        "const_id": 2839
    },
    {
        "const_id": 2840
    },
    {
        "const_id": 2841
    },
    {
        "const_id": 2842
    },
    {
        "const_id": 2901
    },
    {
        "const_id": 2902
    },
    {
        "const_id": 2903
    },
    {
        "const_id": 2904
    },
    {
        "const_id": 2905
    },
    {
        "const_id": 2906
    },
    {
        "const_id": 2907
    },
    {
        "const_id": 2908
    },
    {
        "const_id": 2909
    },
    {
        "const_id": 2910
    },
    {
        "const_id": 2911
    },
    {
        "const_id": 2912
    },
    {
        "const_id": 2913
    },
    {
        "const_id": 2914
    },
    {
        "const_id": 2915
    },
    {
        "const_id": 2916
    },
    {
        "const_id": 2917
    },
    {
        "const_id": 2918
    },
    {
        "const_id": 2919
    },
    {
        "const_id": 2920
    },
    {
        "const_id": 2921
    },
    {
        "const_id": 2922
    },
    {
        "const_id": 2923
    },
    {
        "const_id": 2924
    },
    {
        "const_id": 2925
    },
    {
        "const_id": 2926
    },
    {
        "const_id": 2927
    },
    {
        "const_id": 2928
    },
    {
        "const_id": 3001
    },
    {
        "const_id": 3002
    },
    {
        "const_id": 3101
    },
    {
        "const_id": 3201
    },
    {
        "const_id": 3202
    },
    {
        "const_id": 3203
    },
    {
        "const_id": 3204
    },
    {
        "const_id": 3205
    },
    {
        "const_id": 3206
    },
    {
        "const_id": 3207
    },
    {
        "const_id": 3208
    },
    {
        "const_id": 3209
    },
    {
        "const_id": 3210
    },
    {
        "const_id": 3211
    },
    {
        "const_id": 3212
    },
    {
        "const_id": 3213
    },
    {
        "const_id": 3214
    },
    {
        "const_id": 3215
    },
    {
        "const_id": 3216
    },
    {
        "const_id": 3217
    },
    {
        "const_id": 3218
    },
    {
        "const_id": 3219
    },
    {
        "const_id": 3220
    },
    {
        "const_id": 3301
    },
    {
        "const_id": 3302
    },
    {
        "const_id": 3303
    },
    {
        "const_id": 3304
    },
    {
        "const_id": 3305
    },
    {
        "const_id": 3306
    },
    {
        "const_id": 3307
    },
    {
        "const_id": 3308
    },
    {
        "const_id": 3309
    },
    {
        "const_id": 3310
    },
    {
        "const_id": 3311
    },
    {
        "const_id": 3312
    },
    {
        "const_id": 3313
    },
    {
        "const_id": 3314
    },
    {
        "const_id": 3315
    },
    {
        "const_id": 3316
    },
    {
        "const_id": 3317
    },
    {
        "const_id": 3318
    },
    {
        "const_id": 3319
    },
    {
        "const_id": 3320
    },
    {
        "const_id": 3321
    },
    {
        "const_id": 3322
    },
    {
        "const_id": 3323
    },
    {
        "const_id": 3324
    },
    {
        "const_id": 3325
    },
    {
        "const_id": 3326
    },
    {
        "const_id": 3327
    },
    {
        "const_id": 3328
    },
    {
        "const_id": 3329
    },
    {
        "const_id": 3330
    },
    {
        "const_id": 3331
    },
    {
        "const_id": 3332
    },
    {
        "const_id": 3333
    },
    {
        "const_id": 3334
    },
    {
        "const_id": 3335
    },
    {
        "const_id": 3336
    },
    {
        "const_id": 3337
    },
    {
        "const_id": 3338
    },
    {
        "const_id": 3339
    },
    {
        "const_id": 3401
    },
    {
        "const_id": 3501
    }
];
array.forEach((ele)=>{
    const params = {
        Bucket: 'results2024',
        Key: `election2024/constituency${ele.const_id}.csv`,
        Body: fs.createReadStream(`../constituencies543/constituency${ele.const_id}.csv`)
    };
    
    
    // Upload the file to S3
    s3.upload(params, (err, data) => {
        if (err) {
            console.log('Error uploading file:', err);
        } else {
            console.log('File uploaded successfully. File location:', data.Location);
        }
    });
});

