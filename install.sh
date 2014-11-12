DIR_BASE=`pwd`
PARTIAL_URL="https://s3.amazonaws.com/teamcmpads/ipdata/partial.csv"

if [ ! -f "$DIR_BASE/db/partial.csv" ]
then
  wget -O "$DIR_BASE/db/partial.csv" $PARTIAL_URL 
fi
